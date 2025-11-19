'use server'

import { deleteAvatar, errorHandler, sendAvatar, sendUser } from "@/requests"
import { EditActionFunction } from "./template"
import { IDetailedUser } from "@/interfaces"

export const editUser: EditActionFunction<IDetailedUser> = async (instance) => {
  instance.socials = instance.socials.map(s => ({...s, user: instance.id}))
  return sendUser(instance)
}

export async function editAvatar(formData: FormData) {
  const [dataRaw, status] = await sendAvatar(formData)
  const data = await errorHandler(dataRaw, status)
  return data ?? formData
}

export async function removeAvatar() {
  const [dataRaw, status] = await deleteAvatar()
  await errorHandler(dataRaw, status)
}