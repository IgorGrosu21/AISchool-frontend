import { fetchSchoolWithTimetable, fetchSubjects, handleResponse } from "@/requests"
import { editSchoolWithTimetable } from '@/app/actions';
import { SchoolWithTimetableEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';
import { Editor } from './editor';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const [school, subjects] = await Promise.all([
    handleResponse(fetchSchoolWithTimetable({ schoolSlug })),
    handleResponse(fetchSubjects())
  ])
  const t = await getTranslations('schools');
  const segments = [
    {label: school.name, href: `schools/${schoolSlug}`},
    {label: t('timetable'), href: 'timetable'},
  ]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolWithTimetableEditorContext,
      initial: school,
      action: editSchoolWithTimetable,
      segments,
      resource: { type: 'school', schoolSlug }
    }}>
      <Editor allSubjects={subjects} />
    </EditorProvider>
  </NavigationContainer>
}