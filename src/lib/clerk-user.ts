import type { User } from '@clerk/tanstack-react-start/server'

export const getUserEmail = (user: User | null | undefined): string => {
  if (!user) return ''

  return user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''
}

export const getAllUserEmails = (
  user: User | null | undefined
): Array<{
  id: string
  email: string
  verified: boolean
  primary: boolean
}> => {
  if (!user?.emailAddresses) return []

  return user.emailAddresses.map((email) => ({
    id: email.id,
    email: email.emailAddress,
    verified: email.verification?.status === 'verified',
    primary: email.id === user.primaryEmailAddressId,
  }))
}

export const getVerifiedUserEmail = (user: User | null | undefined): string => {
  if (!user?.emailAddresses) return ''

  const primaryEmail = user.primaryEmailAddress
  if (primaryEmail?.verification?.status === 'verified') {
    return primaryEmail.emailAddress
  }

  const verifiedEmail = user.emailAddresses.find((email) => email.verification?.status === 'verified')

  return verifiedEmail?.emailAddress || getUserEmail(user)
}

export const userHasEmail = (user: User | null | undefined): user is User => {
  return Boolean(user && getUserEmail(user))
}
