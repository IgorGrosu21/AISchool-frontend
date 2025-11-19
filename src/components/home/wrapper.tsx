'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { IPersonHome } from '@/interfaces'
import { Greetings } from './greetings'
import { Sections } from './sections'

export function HomeWrapper({personHome}: {personHome: IPersonHome}) {
  return <LazyMotion features={domAnimation} strict>
    <Greetings profileType={personHome.profileType} user={personHome.user} />
    <Sections personHome={personHome} />
  </LazyMotion>
}