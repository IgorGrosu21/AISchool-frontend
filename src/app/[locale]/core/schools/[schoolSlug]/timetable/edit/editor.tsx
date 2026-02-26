'use client'

import { ISubject } from '@/interfaces'
import { Klasses, LessonTimeEditor, SchoolPositionsEditor, Stepper, SubjectsEditor } from '@/components'
import { Panel } from '@/ui'
import { useSchoolWithTimetableEditorContext } from '@/providers'

export function Editor({allSubjects}: {allSubjects: ISubject[]}) {
  const { instance: school, setInstance: setSchool } = useSchoolWithTimetableEditorContext()

  return <Stepper components={[
    {label: 'klasses', component: <Klasses
      key={0}
      type='edit'
      hrefTemplate={`/core/schools/${school.slug}/timetable/<klassSlug>/edit`}
      klasses={school.klasses}
    />},
    {label: 'subjects', component: <Panel key={1}>
      <SubjectsEditor
        subjectSlugs={school.subjectSlugs}
        setSubjects={subjects => setSchool(s => ({...s, subjectSlugs: subjects.map(s => s.slug)}))}
        allSubjects={allSubjects}
        lang={school.lang}
        type='school'
      />
    </Panel>},
    {label: 'lesson_time', component: <LessonTimeEditor
      key={2}
      school={school}
      setTimetable={timetable => setSchool(s => ({...s, timetable}))}
    />},
    {label: 'teachers', component: <SchoolPositionsEditor key={3} school={school} setSchool={setSchool} />}
  ]} />
}