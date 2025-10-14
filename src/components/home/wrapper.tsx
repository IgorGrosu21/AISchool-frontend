'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { IPersonHome } from '@/interfaces'
import { Greetings } from './greetings'
import { Sections } from './sections'

//mui components
import Stack from "@mui/material/Stack"

export function HomeWrapper({personHome}: {personHome: IPersonHome}) {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <Greetings profileType={personHome.profileType} user={personHome.user} />
      <Sections personHome={personHome} />
    </LazyMotion>
  </Stack>
}