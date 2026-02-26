import { NavigationContainer, DiaryWrapper } from "@/components";
import { fetchPersonDiary, handleResponse } from "@/requests";
import { getTranslations } from "next-intl/server";

interface SearchParams {
  schoolSlug?: string
  childId?: string
  rawDate?: string
}

export default async function Page({ searchParams }: {searchParams: Promise<SearchParams>}) {
  const personDiary = await handleResponse(fetchPersonDiary())
  const t = await getTranslations('diary')

  let { schoolSlug, childId } = await searchParams
  const { rawDate } = await searchParams
  const date = rawDate ? new Date(rawDate) : new Date()
  
  switch (personDiary.profileType) {
    case 'teacher':
      const school = personDiary.schools.find(school => school.slug === schoolSlug)
      if (school === undefined || schoolSlug === undefined) {
        schoolSlug = personDiary.schools[0].slug
      }
      break
    case 'parent':
      const child = personDiary.children.find(child => child.id === childId)
      if (child === undefined || childId === undefined) {
        childId = personDiary.children[0].id
      }
      break
  }
  
  return <NavigationContainer last={t('singular')}>
    <DiaryWrapper schoolSlug={schoolSlug} childId={childId} date={date} personDiary={personDiary} />
  </NavigationContainer>
}