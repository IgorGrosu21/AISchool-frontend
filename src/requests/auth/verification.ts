import type { ITokens, VerifyCodeRequest, VerifyTokenRequest } from "../../interfaces"
import type { DeviceInfo } from '@/utils/deviceInfo'
import { post } from "./client";

export async function sendCodeVerificationRequest(request: VerifyCodeRequest, deviceInfo: DeviceInfo | null) {
  return post<VerifyCodeRequest, ITokens>(`verify-code/`, request, deviceInfo)
}

export async function sendTokenVerificationRequest(request: VerifyTokenRequest, deviceInfo: DeviceInfo | null) {
  return post<VerifyTokenRequest, ITokens>(`verify-token/`, request, deviceInfo)
}