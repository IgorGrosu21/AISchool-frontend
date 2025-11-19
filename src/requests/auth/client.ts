import { getToken } from '@/app/actions';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { getLocale } from 'next-intl/server';
import type { IError } from '@/interfaces';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 second timeout
})

export const request = async <T>(config: AxiosRequestConfig, signedIn = false): Promise<[T | IError, number]> => {
  const access = signedIn ? await getToken() : undefined;
  const locale = await getLocale();
  
  try {
    const response = await api.request<T>({
      ...config,
      method: config.method ?? 'POST',
      headers: {
        ...config.headers,
        'Accept-Language': locale,
        ...(access ? { Authorization: `Bearer ${access}` } : {}),
      }
    })
    return [response.data, response.status];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [error.response?.data as IError, error.status ?? 500]
    }
    return [{ code: 500, detail: 'internal_server_error' }, 500]
  }
}