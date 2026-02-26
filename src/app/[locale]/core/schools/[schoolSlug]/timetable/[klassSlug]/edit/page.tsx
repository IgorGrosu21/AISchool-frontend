import { fetchKlassWithLessons, fetchSubjects, handleResponse } from "@/requests"
import { getTranslations } from "next-intl/server"
import { NavigationContainer } from "@/components"
import { EditorProvider, KlassWithLessonsEditorContext } from "@/providers"
import { editKlassWithLessons } from "@/app/actions"
import { Editor } from "./editor"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params
  const [klass, subjects] = await Promise.all([
    handleResponse(fetchKlassWithLessons({ schoolSlug, klassSlug })),
    handleResponse(fetchSubjects())
  ])
  const t = await getTranslations('klasses');
  const segments = [
    {label: klass.school.name, href: `schools/${schoolSlug}`},
    {label: t('timetable'), href: 'timetable'},
    {label: `${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`, href: klassSlug},
  ]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: KlassWithLessonsEditorContext,
      initial: klass,
      action: editKlassWithLessons,
      segments,
      resource: { type: 'klass', schoolSlug, klassSlug }
    }}>
      <Editor allSubjects={subjects.filter(s => klass.school.subjectSlugs.includes(s.slug))} />
    </EditorProvider>
  </NavigationContainer>
}