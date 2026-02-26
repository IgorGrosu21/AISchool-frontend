'use server'

import { NavigationContainer, Stepper, Account, Security } from "@/components"
import { IUserAccount } from "@/interfaces"
import { EditorProvider, AccountEditorContext } from "@/providers"
import { fetchAccount, fetchAuthUser, handleResponse } from "@/requests"
import { getLocale, getTranslations } from "next-intl/server"
import { editUser } from "@/app/actions"

export default async function Page() {
  const t = await getTranslations('account')
  const [account, authUser] = await Promise.all([handleResponse(fetchAccount(), {
    forbidden: async () => {
      const locale = await getLocale()
      const dummy = { id: '', name: '' }
      const dummyWithSlug = { ...dummy, slug: '' }
      const account: IUserAccount = {
        id: '',
        socials: [],
        city: { ...dummy, region: { ...dummyWithSlug, country: { ...dummyWithSlug, flag: '' } } },
        profileType: 'student',
        lang: locale.toUpperCase(),
        name: '',
        surname: '',
        avatar: null
      }
      return account
    }
  }), handleResponse(fetchAuthUser())])

  const segments = [{label: account.id ? `${account.name} ${account.surname}` : t('title'), href: `account`}]

  return <NavigationContainer segments={segments} last='edit'>
    <Stepper components={[
      { label: 'account', component: <EditorProvider key={0} value={{
        Context: AccountEditorContext,
        initial: account,
        action: editUser,
        segments: [],
        resource: { type: 'account', accountId: account.id }
      }}>
        <Account />
      </EditorProvider> },
      { label: 'security', component: <Security key={1} authUser={authUser} /> },
      { label: 'subscriptions', component: <></> },
      { label: 'notifications', component: <></> }
    ]} />
  </NavigationContainer>
}