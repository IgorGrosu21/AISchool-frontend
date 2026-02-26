import { NavigationContainer, Stepper, PageTitle, Subjects, LessonTime, SchoolPositions, Klasses } from "@/components"
import { fetchSchoolWithTimetable, fetchSubjects, handleResponse } from "@/requests"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const [school, subjects] = await Promise.all([
    handleResponse(fetchSchoolWithTimetable({ schoolSlug })),
    handleResponse(fetchSubjects())
  ])
  const t = await getTranslations('schools');

  const schoolSubjects = school.subjectSlugs.map(s => subjects.find(s2 => s2.slug === s)!)
  
  return <NavigationContainer segments={[
      {label: school.name, href: `schools/${schoolSlug}`}
    ]} last={t('timetable')}>
    <PageTitle label={t('timetable')} link={`/core/schools/${schoolSlug}/timetable`} resource={{ type: 'school', schoolSlug }} />
    <Stepper components={[
      {label: 'klasses', component: <Klasses
        key={0}
        type='view'
        hrefTemplate={`/core/schools/${schoolSlug}/timetable`}
        klasses={school.klasses}
      />},
      {label: 'subjects', component: <Subjects key={1} subjects={schoolSubjects} />},
      {label: 'lesson_time', component: <LessonTime key={2} timetable={school.timetable} />},
      {label: 'teachers', component: <SchoolPositions key={3} staff={school.staff} allSubjects={subjects} />}
    ]} />
  </NavigationContainer>
}