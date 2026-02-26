import { editHomework } from "@/app/actions"
import { NavigationContainer } from "@/components"
import { EditorProvider, HomeworkEditorContext } from "@/providers"
import { Editor } from "./editor"
import { fetchHomework, handleResponse } from "@/requests"
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
  const { studentId } = await searchParams
  const { schoolSlug, klassOrGroupSlug, lessonTimeSlug, rawDate } = await params
  
  const homework = await handleResponse(fetchHomework({ schoolSlug, klassOrGroupSlug, lessonTimeSlug, date: rawDate, studentId }))
  const specificLesson = homework.specificLesson
  const date = new Date(specificLesson.date)
  const lesson = specificLesson.lesson
  const dateLabel = dateToVerbose(date)

  const segments = [
    {label: `${lesson.klassOrGroup.slug}`, href: `homeworks/${schoolSlug}/${klassOrGroupSlug}`},
    {label: `${lesson.subjectName}`, href: lessonTimeSlug}
  ]
  
  return <NavigationContainer segments={segments} last={`${dateLabel}, ${lesson.lessonTime.starting}`}>
    <EditorProvider value={{
      Context: HomeworkEditorContext,
      initial: homework,
      action: editHomework,
      segments: [{
        label: '',
        href: `lessons/${schoolSlug}/${klassOrGroupSlug}/${lessonTimeSlug}/${rawDate}`
      }],
      resource: { type: 'homework' }
    }}>
      <Editor date={dateLabel} />
    </EditorProvider>
  </NavigationContainer>
}