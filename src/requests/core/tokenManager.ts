import { getToken, setTokens } from '@/app/actions/token';
import type { ITokens } from '@/interfaces';
import axios from 'axios';

export type TokenType = 'access' | 'subscriptions';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL!;
const SUBSCRIPTIONS_URL = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL!;

async function generateSubscriptionsToken(): Promise<string | undefined> {
  try {
    const accessToken = await getToken('access');
    if (!accessToken) {
      return undefined;
    }
    
    const response = await axios.post<{token: string}>(
      `${SUBSCRIPTIONS_URL}/services/generate-token/`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.token;
  } catch {
    return undefined;
  }
}

export async function getTokenByType(type: TokenType, forceRefresh: boolean = false): Promise<string | undefined> {
  let token = undefined;
  
  if (!forceRefresh) {
    token = await getToken(type);
  }
  if (!token && type === 'subscriptions') {
    token = await generateSubscriptionsToken();
  }
  
  return token;
}

let refreshPromise: Promise<ITokens | null> | null = null;

export async function refreshAccessToken(): Promise<ITokens | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const refresh = await getToken('refresh');
      if (!refresh) {
        return null;
      }
      
      const response = await axios.post<ITokens>(
        `${AUTH_URL}/api/refresh/`,
        { refresh },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      await setTokens(response.data);
      return response.data;
    } catch {
      return null;
    } finally {
      refreshPromise = null; // Clear the lock
    }
  })();
  
  return refreshPromise;
}
