'use server'

import { HomeWrapper } from '@/components'
import { errorHandler, fetchPersonHome } from '@/requests'

export default async function Page() {
  const [personHomeRaw, status] = await fetchPersonHome()
  const personHome = await errorHandler(personHomeRaw, status)

  return <HomeWrapper personHome={personHome} />
}