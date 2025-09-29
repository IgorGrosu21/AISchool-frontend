import { SubscriptionHero, SubscriptionPlans, SubscriptionPluses, SubscriptionDescription } from '@/components'
import { Stack } from '@mui/material'

export default async function Page() {
  return <Stack>
    <SubscriptionHero />
    <SubscriptionPluses />
    <SubscriptionPlans />
    <SubscriptionDescription />
  </Stack>
}