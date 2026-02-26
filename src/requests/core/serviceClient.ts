import axios, { AxiosError } from 'axios';
import { setupCache, type CacheRequestConfig } from 'axios-cache-interceptor';
import { createNamespacedStorage, type ServiceName } from './storage';
import { getTokenByType, refreshAccessToken, type TokenType } from './tokenManager';
import { IDetailedMedia, IError, IMedia } from '@/interfaces';
import { getLocale } from 'next-intl/server';

type RequestFn = <T>(requestConfig: CacheRequestConfig & { requiresAuth?: boolean }, customToken?: string) => ResWithError<T>
type SendFileFn = <T = IMedia>(requestConfig: CacheRequestConfig) => ResWithError<T>
type DeleteFileFn = (requestConfig: CacheRequestConfig) => ResWithError<null>
type SendDetailedFileFn = (requestConfig: CacheRequestConfig) => ResWithError<IDetailedMedia>
type DeleteDetailedFileFn = (requestConfig: CacheRequestConfig, id: string) => ResWithError<null>


export type ResWithError<T> = Promise<T | IError>;

export type ServiceConfig = {
  name: ServiceName;
  baseURL: string;
  tokenType: TokenType;
}

export type ServiceClient = {
  name: ServiceName;
  request: RequestFn
  sendFile: SendFileFn
  deleteFile: DeleteFileFn
  sendDetailedFile: SendDetailedFileFn
  deleteDetailedFile: DeleteDetailedFileFn
  clearCache: () => Promise<void>;
}

export function createServiceClient(config: ServiceConfig): ServiceClient {
  const api = setupCache(axios.create({
    baseURL: config.baseURL + '/api/',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  }), {
    storage: createNamespacedStorage(config.name),
    ttl: 1000 * 60 * 5, // 5 minutes
    interpretHeader: false,
    methods: ['get', 'head', 'options'],
    cachePredicate: {
      statusCheck: (status) => status >= 200 && status < 300,
    },
  })
  
  const request: RequestFn = async ({requiresAuth = true, ...requestConfig}, customToken) => {
    let token: string | undefined;
    if (requiresAuth) {
      token = customToken ?? await getTokenByType(config.tokenType);
      if (!token) {
        return { code: 401, detail: 'unauthorized', attr: null };
      }
    }

    const locale = await getLocale();

    const params: Record<string, string> = {};
    if (requestConfig.params) {
      for (const [key, value] of Object.entries(requestConfig.params)) {
        if (value) {
          params[key] = value.toString();
        }
      }
    }
    
    try {
      const response = await api.request({
        ...requestConfig,
        method: requestConfig.method ?? 'GET',
        id: `${requestConfig.method?.toLowerCase() ?? 'get'}_${requestConfig.url}`,
        headers: {
          ...requestConfig.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Accept-Language': locale,
          'Content-Type': requestConfig.headers?.['Content-Type'] ?? 'application/json'
        },
        params,
        cache: requestConfig.cache,
      });
      
      if (response.status === 204) {
        return null;
      }
      
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? 500;
        
        // Handle 401 with retry
        if (status === 401 && customToken === undefined && requiresAuth) {
          if (config.tokenType === 'access') {
            const tokens = await refreshAccessToken();
            if (tokens?.access) {
              return request({...requestConfig, requiresAuth: true}, tokens.access);
            }
          } else if (config.tokenType === 'subscriptions') {
            const newToken = await getTokenByType(config.tokenType, true);
            if (newToken) {
              return request({...requestConfig, requiresAuth: true}, newToken);
            }
          }
          
          return { code: 401, detail: 'unauthorized', attr: null };
        }

        if (error.response) {
          const errorData = error.response.data as IError;
          return { code: status, detail: errorData.detail, attr: errorData.attr };
        }
        
        return { code: status, detail: 'internal server error', attr: null };
      }
      
      return { code: 500, detail: 'internal server error', attr: null };
    }
  }

  const sendFile: SendFileFn = async (requestConfig) => {
    requestConfig = {
      ...requestConfig,
      method: requestConfig.method ?? 'PATCH',
      headers: { ...requestConfig.headers, 'Content-Type': 'multipart/form-data' }
    };
    return request({...requestConfig, requiresAuth: true});
  }
  
  const deleteFile: DeleteFileFn = async (requestConfig) => {
    return request({...requestConfig, method: 'DELETE', requiresAuth: true});
  }

  const sendDetailedFile: SendDetailedFileFn = async (requestConfig) => {
    return sendFile<IDetailedMedia>({...requestConfig, method: 'POST'});
  }
  
  const deleteDetailedFile: DeleteDetailedFileFn = async (requestConfig, id) => {
    return deleteFile({...requestConfig, params: { ...requestConfig.params, id }});
  }
  
  async function clearCache() {
    if ('storage' in api && api.storage?.clear) {
      await api.storage.clear();
    }
  }
  
  return {
    name: config.name,
    request,
    sendFile,
    deleteFile,
    sendDetailedFile,
    deleteDetailedFile,
    clearCache,
  };
}