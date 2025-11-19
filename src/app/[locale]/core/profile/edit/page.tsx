'use server'

import { NavigationContainer } from "@/components"
import { IDetailedUser } from "@/interfaces"
import { EditorProvider, UserEditorContext } from "@/providers"
import { errorHandler, fetchUser } from "@/requests"
import { getLocale, getTranslations } from "next-intl/server"
import { Editor } from "./editor"
import { editUser } from "@/app/actions"

export default async function Page() {
  const t = await getTranslations('profile')
  let user: IDetailedUser | undefined = undefined
  const [userRaw, status] = await fetchUser()
  const locale = await getLocale()
  if (status === 403) {
    user = {
      id: '',
      socials: [],
      city: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          slug: '',
          country: {
            id: '',
            name: '',
            flag: '',
            slug: ''
          }
        }
      },
      type: 'student',
      lang: locale.toUpperCase(),
      name: '',
      surname: '',
      profileLink: '',
      isVerified: false,
      canEdit: true
    }
  } else {
    user = await errorHandler(userRaw, status)
  }

  const segments = [{label: user.id ? `${user.name} ${user.surname}` : t('title'), href: `profile`}]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: UserEditorContext,
      initial: user,
      action: editUser,
      segments
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}