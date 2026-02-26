import { createServiceClient, type ServiceConfig } from './serviceClient';

const configs: ServiceConfig[] = [
  {
    name: 'diary',
    baseURL: process.env.NEXT_PUBLIC_DIARY_URL!,
    tokenType: 'access'
  },
  {
    name: 'manuals',
    baseURL: process.env.NEXT_PUBLIC_MANUALS_URL!,
    tokenType: 'subscriptions'
  },
  {
    name: 'notifications',
    baseURL: process.env.NEXT_PUBLIC_NOTIFICATIONS_URL!,
    tokenType: 'access'
  },
  {
    name: 'subscriptions',
    baseURL: process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL!,
    tokenType: 'access'
  }
];

export const [
  diaryClient,
  manualsClient,
  notificationsClient,
  subscriptionsClient
] = configs.map(createServiceClient);

