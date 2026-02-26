import { editSpecificLesson } from "@/app/actions"
import { NavigationContainer } from "@/components"
import { EditorProvider, SpecificLessonEditorContext } from "@/providers"
import { fetchSpecificLesson, handleResponse } from "@/requests"
import { Editor } from "./editor"
import { dateToVerbose } from "@/utils/dates"

interface Props {
  params: Promise<{
    schoolSlug: string,
    klassOrGroupSlug: string,
    lessonTimeSlug: string,
    rawDate: string
  }>
  searchParams: Promise<{studentId?: string}>
}

export default async function Page({ params, searchParams }: Props) {
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, rawDate } = await params
  const { studentId } = await searchParams
  const date = new Date(rawDate)

  const specificLesson = await handleResponse(fetchSpecificLesson({ schoolSlug, klassOrGroupSlug, lessonTimeSlug, date: rawDate }))
  const lesson = specificLesson.lesson
  const dateLabel = dateToVerbose(date)

  const segments = [
    {label: `${lesson.klassOrGroup.slug}`, href: `lessons/${schoolSlug}/${klassOrGroupSlug}`},
    {label: `${lesson.subjectName}`, href: lessonTimeSlug}
  ]
  
  return <NavigationContainer segments={segments} last={`${dateLabel}, ${lesson.lessonTime.starting}`}>
    <EditorProvider value={{
      Context: SpecificLessonEditorContext,
      initial: specificLesson,
      action: editSpecificLesson,
      segments: [{
        label: '',
        href: `diary/?schoolSlug=${schoolSlug}&rawDate=${rawDate}`
      }],
      resource: { type: 'specificLesson' }
    }}>
      <Editor date={dateLabel} studentId={studentId} />
    </EditorProvider>
  </NavigationContainer>
}