import { useUser } from '@clerk/tanstack-react-start'

import { toast } from 'sonner'

import { api } from '~/trpc/react'

export type UserSettingsInput = {
  syncWithDb?: boolean
  language?: string
}

export const useUserSettings = () => {
  const { isSignedIn, isLoaded } = useUser()
  const utils = api.useUtils()

  const {
    data: settings,
    isLoading,
    error,
  } = api.user.getSettings.useQuery(undefined, {
    enabled: isSignedIn && isLoaded,
  })

  const updateSettingsMutation = api.user.updateSettings.useMutation({
    onSuccess: (updatedSettings) => {
      console.log('Settings updated successfully: ', updatedSettings)
      utils.user.getSettings.setData(undefined, updatedSettings)
      toast.success('✅ Settings updated successfully.')
    },
    onError: (error) => {
      console.log('Settings update error: ', error)
      utils.user.getSettings.invalidate()
      toast.error(`❌ Failed to update settings: ${error.message}`)
    },
  })

  const updateSettings = (newSettings: UserSettingsInput) => {
    updateSettingsMutation.mutate(newSettings)
  }

  const updateSetting = <K extends keyof UserSettingsInput>(key: K, value: UserSettingsInput[K]) => {
    console.log(`Updating setting ${String(key)} to:`, value)
    updateSettings({ [key]: value })
  }

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    updateSetting,
    isUpdating: updateSettingsMutation.isPending,
  }
}
