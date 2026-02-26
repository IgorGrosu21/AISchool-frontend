import type { AuthRequest, Oauth2Request, ITokens, IVerificationRequired } from "../../interfaces"
import { post } from "./client"
import type { DeviceInfo } from '@/utils/deviceInfo'

export async function sendAuthRequest(
  type: 'login' | 'signup' | 'restore',
  request: AuthRequest,
  deviceInfo: DeviceInfo | null
) {
  return post<AuthRequest, ITokens | IVerificationRequired>(`${type}/`, request, deviceInfo)
}

export async function sendOauth2Request(request: Oauth2Request, deviceInfo: DeviceInfo | null) {
  return post<Oauth2Request, ITokens>(`oauth2/`, request, deviceInfo)
}