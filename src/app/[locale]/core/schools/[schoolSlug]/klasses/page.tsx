import { Klasses, NavigationContainer, PageTitle } from "@/components"
import { fetchSchoolWithKlasses, handleResponse } from "@/requests"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const school = await handleResponse(fetchSchoolWithKlasses({ schoolSlug }))
  const t = await getTranslations('klasses');
  
  return <NavigationContainer segments={[
      {label: school.name, href: `schools/${schoolSlug}`}
    ]} last={t('plural')}>
    <PageTitle label={t('plural')} link={`/core/schools/${schoolSlug}/klasses`} resource={{ type: 'school', schoolSlug }} />
    <Klasses hrefTemplate={`/core/schools/${schoolSlug}/klasses`} klasses={school.klasses} />
  </NavigationContainer>
}