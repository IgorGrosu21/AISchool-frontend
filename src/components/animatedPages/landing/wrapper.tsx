'use server'

import { Welcome } from './welcome'
import { WithMotion } from '../withMotion'

export async function LandingWrapper() {
  return <WithMotion>
    <Welcome type='hero' />
    <Welcome type='cta' />
  </WithMotion>
}
