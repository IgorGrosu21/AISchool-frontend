import { fetchKlassWithLessons, fetchSubjects, handleResponse } from "@/requests"
import { getTranslations } from "next-intl/server"
import { NavigationContainer, PageTitle, SmallProfile, Stepper, Subjects, Groups, Lessons, Students, Replacements } from "@/components"
import { Panel } from "@/ui"

//mui components
import Typography from "@mui/material/Typography"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params
  const [klass, subjects] = await Promise.all([
    handleResponse(fetchKlassWithLessons({ schoolSlug, klassSlug })),
    handleResponse(fetchSubjects())
  ])
  const t = await getTranslations('klasses');

  const subjectSlugs = klass.lessons.map(l => l.subjectSlug).filter((s, i, a) => a.findIndex(s2 => s2 === s) === i)
  const klassSubjects = subjectSlugs.map(s => subjects.find(s2 => s2.slug === s)!)
  const allLessons = [...klass.lessons, ...klass.groups.flatMap(g => g.lessons)]

  return <NavigationContainer segments={[
      {label: klass.school.name, href: `schools/${schoolSlug}`},
      {label: t('timetable'), href: 'timetable'}
    ]} last={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}>
    <PageTitle
      label={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}
      link={`/core/schools/${schoolSlug}/timetable/${klassSlug}`}
      resource={{ type: 'klass', schoolSlug, klassSlug }}
    />
    <Panel gap={2}>
      <Typography variant='h6'>{t(`teacher`)}:</Typography>
      <SmallProfile user={klass.teacher?.user ?? null} />
    </Panel>
    <Stepper components={[
      {label: 'subjects', component: <Subjects key={0} subjects={klassSubjects} />},
      {label: 'groups', component: <Groups key={1} groups={klass.groups} />},
      {label: 'lessons', component: <Lessons
        key={2}
        groups={klass.groups}
        timetable={klass.school.timetable}
        lessons={allLessons}
      />},
      {label: 'replacements', component: <Replacements
        key={3}
        school={klass.school}
        lessons={allLessons}
      />},
      {label: 'students', component: <Students key={4} students={klass.students} />},
    ]} />
  </NavigationContainer>
}