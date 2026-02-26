'use server'

import { IPersonHome } from '@/interfaces'
import { Greetings } from './greetings'
import { Sections } from './sections'
import { WithMotion } from '../withMotion'

export async function HomeWrapper({personHome}: {readonly personHome: IPersonHome}) {
  return <WithMotion>
    <Greetings profileType={personHome.profileType} user={personHome.user} />
    <Sections personHome={personHome} />
  </WithMotion>
}