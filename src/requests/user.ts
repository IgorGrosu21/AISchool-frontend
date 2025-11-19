import type { IDetailedUser, IUserRoutes } from "../interfaces"
import { request, send, sendFile } from "./client"

export function fetchUserRoutes() {
  return request<IUserRoutes>({url: 'api/user-routes/'})
}

export function fetchUser() {
  return request<IDetailedUser>({url: `api/user/`})
}

export async function sendUser(user: IDetailedUser) {
  return send<IDetailedUser>({url: 'api/user/', method: user.id === '' ? 'POST' : 'PUT', data: user})
}

export async function sendAvatar(data: FormData) {
  return sendFile({url: 'api/user/', method: 'PATCH', data: data})
}

export async function deleteAvatar() {
  return send<undefined>({url: 'api/user/', method: 'DELETE'})
}