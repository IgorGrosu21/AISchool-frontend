'use server'

import {
  handleResponse, isError,
  sendAccount, sendAvatar, deleteAvatar, sendProfile, fetchPersonPermissions, unmarkPersonAsAutoCreated
} from "@/requests"
import type { IPersonProfile, IUserAccount } from "@/interfaces"
import { DeleteFileActionFunction, EditActionFunction, EditFileActionFunction } from "./template"
import { getToken } from "./token"

export async function createUsersInMicroservices(profileType: string, isAutoCreated = false): Promise<void> {
  try {
    const accessToken = await getToken()
    
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/create-users`, {
      method: 'POST',
      body: JSON.stringify({ profileType }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `access_token=${accessToken}`
      },
    })

    if (isAutoCreated) {
      await handleResponse(unmarkPersonAsAutoCreated());
    }
  } catch {
    return
  }
}

export const editUser: EditActionFunction<IUserAccount> = async (instance) => {
  const data = await sendAccount(instance)

  if (isError(data)) {
    return data
  }

  if (instance.id === '') {
    await createUsersInMicroservices(instance.profileType)
  }
  
  return data
}
export const editAvatar: EditFileActionFunction<IUserAccount> = async (formData) => {
  return handleResponse(sendAvatar(formData))
}

export const removeAvatar: DeleteFileActionFunction<IUserAccount> = async () => {
  return handleResponse(deleteAvatar())
}

export const editPerson: EditActionFunction<IPersonProfile> = async (instance) => {
  return sendProfile(instance)
}

export async function getPermissions() {
  return fetchPersonPermissions()
}