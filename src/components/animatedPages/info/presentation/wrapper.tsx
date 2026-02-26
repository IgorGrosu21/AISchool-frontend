'use server'

import { WithMotion } from '../../withMotion'
import { PlusesWrapper } from './plusesWrapper'

export async function PresentationWrapper() {
  return <WithMotion>
    <PlusesWrapper />
  </WithMotion>
}
