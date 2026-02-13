import { useUser } from '@clerk/tanstack-react-start'
import { useEffect, useRef } from 'react'

import { useUserSettings } from '~/lib/useUserSettings'

import { useChatStore } from '~/stores/useChatStore'

import { api } from '~/trpc/react'

export const useChatSync = () => {
  const {
    getLocalChatsForSync,
    syncChatsFromDatabase,
    moveDbChatsToLocal,
    setChatsDisplayMode,
    chatsDisplayMode,
    setSyncing,
  } = useChatStore()
  const { isSignedIn, isLoaded } = useUser()
  const { settings } = useUserSettings()
  const syncMutation = api.chat.syncLocalChatsToDatabase.useMutation()
  const clearDbChatsMutation = api.chat.clearUserChatsFromDatabase.useMutation()
  const getUserChatsQuery = api.chat.getAllUserChatsWithMessages.useQuery(undefined, {
    enabled: isSignedIn && isLoaded,
    retry: false,
  })

  const hasAttemptedSync = useRef(false)
  const previousSignInState = useRef<boolean | undefined>(undefined)
  const previousSyncSetting = useRef<boolean | null | undefined>(undefined)

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn && !!settings?.syncWithDb) {
      setSyncing(false)
    }
  }, [isLoaded, isSignedIn, setSyncing])

  useEffect(() => {
    if (!isLoaded) return

    if (previousSignInState.current === isSignedIn) return

    previousSignInState.current = isSignedIn

    if (isSignedIn) {
      handleUserLogin()
    } else {
      handleUserLogout()
    }
  }, [isSignedIn, isLoaded, settings?.syncWithDb])

  useEffect(() => {
    if (isSignedIn && getUserChatsQuery.data && !getUserChatsQuery.isLoading && hasAttemptedSync.current) {
      syncChatsFromDatabase(getUserChatsQuery.data)
      setSyncing(false)
    }
  }, [getUserChatsQuery.data, getUserChatsQuery.isLoading, isSignedIn, syncChatsFromDatabase, setSyncing])

  useEffect(() => {
    if (!isSignedIn || !isLoaded || !settings) return

    const currentSyncSetting = settings.syncWithDb

    if (previousSyncSetting.current === currentSyncSetting) return

    previousSyncSetting.current = currentSyncSetting

    if (!currentSyncSetting && getUserChatsQuery.data) {
      handleSyncDisabled()
    } else if (currentSyncSetting) {
      handleSyncEnabled()
    }
  }, [isSignedIn, isLoaded, settings?.syncWithDb, getUserChatsQuery.data, moveDbChatsToLocal, clearDbChatsMutation])

  const handleUserLogin = async () => {
    if (hasAttemptedSync.current) return

    if (!settings?.syncWithDb) {
      console.log('⚠️ Sync is disabled - switching to local mode only')
      setChatsDisplayMode('local')
      return
    }

    setSyncing(true)

    try {
      const localChats = getLocalChatsForSync()

      if (localChats.length > 0) {
        console.log('🔄 Syncing', localChats.length, 'local chats to database...')
        const chatsToSync = localChats.map((chat) => ({
          ...chat,
          title: chat.title || 'New chat',
        }))

        await syncMutation.mutateAsync({ chats: chatsToSync })

        console.log('✅ Local chats synced successfully.')
      }

      hasAttemptedSync.current = true

      await getUserChatsQuery.refetch()
    } catch (error) {
      console.error('❌ Failed to sync local chats: ', error)
      setChatsDisplayMode('synced')
    } finally {
      setSyncing(false)
    }
  }

  const handleUserLogout = () => {
    console.log('👋 User logged out - switching to local chat mode')
    setChatsDisplayMode('local')
    setSyncing(false)
    hasAttemptedSync.current = false
  }

  const handleSyncDisabled = async () => {
    console.log('🔄 User disabled sync - moving DB chats to local storage')
    setSyncing(true)

    try {
      if (getUserChatsQuery.data) {
        moveDbChatsToLocal(getUserChatsQuery.data)
        console.log('✅ DB chats moved to local storage.')

        await clearDbChatsMutation.mutateAsync()
        console.log('✅ DB chats cleared from database.')
      }
    } catch (error) {
      console.error('❌ Failed to move DB chats to local: ', error)
    } finally {
      setSyncing(false)
    }
  }

  const handleSyncEnabled = () => {
    console.log('🔄 User enabled sync - syncing local chats to database')

    hasAttemptedSync.current = false

    handleUserLogin()
  }

  return {
    syncError: syncMutation.error || getUserChatsQuery.error,
    chatsDisplayMode,
  }
}
