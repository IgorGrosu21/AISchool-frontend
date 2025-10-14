'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { Welcome } from './welcome'
import { Pluses } from './pluses'

//mui components
import Stack from "@mui/material/Stack"

export function LandingWrapper() {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <Welcome type='hero' />
      <Pluses />
      <Welcome type='cta' />
    </LazyMotion>
  </Stack>
}
