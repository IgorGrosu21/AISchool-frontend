import { SubscriptionHero, SubscriptionPlans, SubscriptionPluses, SubscriptionDescription } from '@/components'

//mui components
import Stack from "@mui/material/Stack"

export default async function Page() {
  return <Stack>
    <SubscriptionHero />
    <SubscriptionPluses />
    <SubscriptionPlans />
    <SubscriptionDescription />
  </Stack>
}