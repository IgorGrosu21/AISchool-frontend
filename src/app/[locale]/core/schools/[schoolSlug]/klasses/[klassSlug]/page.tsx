import { fetchKlass, fetchSubjects, handleResponse } from "@/requests"
import { getTranslations } from "next-intl/server"
import { NavigationContainer, PageTitle, SmallProfile, Subjects, Students, Stepper, Groups, Lessons, Replacements, Parents } from "@/components"
import { Panel } from "@/ui"

//mui components
import Typography from "@mui/material/Typography"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params
  const [klass, subjects] = await Promise.all([
    handleResponse(fetchKlass({ schoolSlug, klassSlug })),
    handleResponse(fetchSubjects())
  ])
  const t = await getTranslations('klasses');
  
  const allLessons = [...klass.lessons, ...klass.groups.flatMap(g => g.lessons)]
  const subjectSlugs = allLessons.map(l => l.subjectSlug).filter((s, i, a) => a.findIndex(s2 => s2 === s) === i)
  const klassSubjects = subjectSlugs.map(s => subjects.find(s2 => s2.slug === s)!)

  return <NavigationContainer segments={[
      {label: klass.school.name, href: `schools/${schoolSlug}`},
      {label: t('plural'), href: 'klasses'}
    ]} last={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}>
    <PageTitle
      label={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}
      link={`/core/schools/${schoolSlug}/klasses/${klassSlug}`}
      resource={{ type: 'klass', schoolSlug, klassSlug }}
    />
    <Panel gap={2} sx={{flex: 'unset'}}>
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
      {label: 'parents', component: <Parents key={5} parents={klass.parents} />},
    ]} />
  </NavigationContainer>
}