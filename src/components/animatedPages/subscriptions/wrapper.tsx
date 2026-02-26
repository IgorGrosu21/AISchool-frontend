'use server'

import { SubscriptionHero } from './hero'
import { SubscriptionPluses } from './pluses'
import { SubscriptionPlans } from './plans'
import { SubscriptionDescription } from './description'
import { WithMotion } from '../withMotion'

export async function SubscriptionWrapper() {
  return <WithMotion>
    <SubscriptionHero />
    <SubscriptionPluses />
    <SubscriptionPlans />
    <SubscriptionDescription />
  </WithMotion>
}