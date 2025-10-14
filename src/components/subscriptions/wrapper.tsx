'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { SubscriptionHero } from './hero'
import { SubscriptionPluses } from './pluses'
import { SubscriptionPlans } from './plans'
import { SubscriptionDescription } from './description'

//mui components
import Stack from "@mui/material/Stack"

export function SubscriptionWrapper() {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <SubscriptionHero />
      <SubscriptionPluses />
      <SubscriptionPlans />
      <SubscriptionDescription />
    </LazyMotion>
  </Stack>
}