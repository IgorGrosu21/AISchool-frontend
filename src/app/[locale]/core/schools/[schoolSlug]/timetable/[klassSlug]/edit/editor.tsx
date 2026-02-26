'use client'

import { ISubject } from '@/interfaces'
import { GroupsEditor, LessonsEditor, ReplacementsEditor, Stepper, TeachersPicker } from '@/components'
import { Panel } from '@/ui'
import { useKlassWithLessonsEditorContext } from '@/providers'

//mui components
import Stack from "@mui/material/Stack"

export function Editor({allSubjects}: {allSubjects: ISubject[]}) {
  const { instance: klass, setInstance: setKlass } = useKlassWithLessonsEditorContext()

  return <Stack gap={4}>
    <Panel gap={2}>
      <TeachersPicker
        teachers={klass.school.teachers}
        pickedTeacher={klass.teacher}
        onChange={teacher => setKlass(k => ({...k, teacher: teacher ? {
          ...teacher,
          user: {...teacher.user, avatar: null}
        } : null}))}
      />
    </Panel>
    <Stepper components={[
      {label: 'groups', component: <GroupsEditor
        key={0}
        klass={klass}
        setKlass={setKlass}
        allSubjects={allSubjects}
      />},
      {label: 'lessons', component: <LessonsEditor
        key={1}
        klass={klass}
        setKlass={setKlass}
        allSubjects={allSubjects}
      />},
      {label: 'replacements', component: <ReplacementsEditor
        key={2}
        school={klass.school}
        setSchool={school => setKlass(k => ({...k, school}))}
        lessons={[...klass.lessons, ...klass.groups.flatMap(g => g.lessons)]}
      />},
    ]} />
  </Stack>
}