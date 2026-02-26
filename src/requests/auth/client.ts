import { IError } from "@/interfaces";
import axios, { AxiosError } from "axios";
import type { DeviceInfo } from "@/utils/deviceInfo";
import { getLocale } from "next-intl/server";
import type { ResWithError } from "../core/serviceClient";
import { getToken } from "@/app/actions";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL! + '/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

function buildHeaders(deviceInfo: DeviceInfo): Record<string, string> {
  const headers: Record<string, string> = {}
  
  if (deviceInfo) {
    headers['User-Agent'] = deviceInfo.user_agent

    if (deviceInfo.metadata && 'screen_resolution' in deviceInfo.metadata) {
      const screenRes = deviceInfo.metadata.screen_resolution
      if (screenRes) {
        headers['X-Screen-Resolution'] = screenRes
      }
    }
    if (deviceInfo.metadata && 'timezone' in deviceInfo.metadata) {
      const timezone = deviceInfo.metadata.timezone
      if (timezone) {
        headers['X-Timezone'] = timezone
      }
    }
  }
  
  return headers
}

function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500;

    if (error.response) {
      const errorData = error.response.data as IError;
      return { code: status, detail: errorData.detail, attr: errorData.attr };
    }
    
    return { code: status, detail: 'internal server error', attr: null };
  }
  
  return { code: 500, detail: 'internal server error', attr: null };
}

type GetFn = <R>(url: string) => ResWithError<R>
type PostFn = <D, R>(url: string, data: D, deviceInfo?: DeviceInfo | null, useAuthorization?: boolean) => ResWithError<R>
type DestroyFn = (url: string) => ResWithError<null>

export const get: GetFn = async (url) => {
  const locale = await getLocale()
  const token = await getToken('access')
  
  try {
    const response = await api.get(url, {
      headers: {
        'Accept-Language': locale,
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
}

export const post: PostFn = async (url, data, deviceInfo = null, useAuthorization = false) => {
  const token = useAuthorization ? await getToken('access') : undefined
  const locale = await getLocale()
  
  try {
    const response = await api.post(url, data, {
      headers: {
        'Accept-Language': locale,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(deviceInfo ? buildHeaders(deviceInfo) : {}),
      }
    });
    
    if (response.status === 204) {
      return null;
    }
    
    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
}

export const destroy: DestroyFn = async (url) => {
  const token = await getToken('access')
  const locale = await getLocale()
  
  try {
    await api.delete(url, {
      headers: {
        'Accept-Language': locale,
        Authorization: `Bearer ${token}`
      }
    });
    return null;
  } catch (error: unknown) {
    return handleError(error);
  }
}