'use server'

import { HomeWrapper } from '@/components'
import { fetchPersonHome, handleResponse } from '@/requests'
import { redirect } from '@/i18n'

export default async function Page() {
  const personHome = await handleResponse(fetchPersonHome(), {
    forbidden: () => {
      return redirect('/core/settings')
    }
  })

  return <HomeWrapper personHome={personHome} />
}