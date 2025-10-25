'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { Welcome } from './welcome'
import { PlusesWrapper } from './plusesWrapper'

//mui components
import Stack from "@mui/material/Stack"

export function LandingWrapper() {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <Welcome type='hero' />
      <PlusesWrapper />
      <Welcome type='cta' />
    </LazyMotion>
  </Stack>
}
