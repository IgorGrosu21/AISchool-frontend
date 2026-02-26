'use client'

import { PickSchools, SchoolLink, SubjectsEditor } from "@/components"
import { Panel } from "@/ui"
import { IPersonProfile, IPosition, ISchoolName, ISubject } from "@/interfaces"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useCallback, useMemo } from "react"

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

interface TeacherPositionsEditorProps {
  teacher: IPersonProfile & { profileType: 'teacher' }
  setTeacher: Dispatch<SetStateAction<IPersonProfile & { profileType: 'teacher' }>>
  schoolNames: ISchoolName[]
  allSubjects: ISubject[]
}

export function TeacherPositionsEditor({teacher, setTeacher, schoolNames, allSubjects}: TeacherPositionsEditorProps) {
  const dummyPosition: IPosition = useMemo(() => ({
    id: '',
    teacher: {
      id: teacher.id,
      user: {
        id: teacher.account.id,
        name: teacher.account.name,
        surname: teacher.account.surname,
        avatar: teacher.account.avatar
      }
    },
    school: {
      id: '',
      name: '',
      city: {
        id: '',
        name: ''
      },
      preview: '',
      slug: ''
    },
    subjectSlugs: [...teacher.subjectSlugs]
  }), [teacher])
  const t = useTranslations('positions')

  const schools = useMemo(() => teacher.workPlaces.map(p => p.school), [teacher.workPlaces])

  const setSchools = useCallback((schools: ISchoolName[]) => {
    setTeacher(t => ({
      ...t,
      workPlaces: schools.map(s => t.workPlaces.find(w => w.school.id === s.id) ?? ({...dummyPosition, school: s}))
    }))
  }, [dummyPosition, setTeacher])

  return <Stack gap={4}>
    <PickSchools value={schools} setValue={setSchools} options={schoolNames} />
    <Stack gap={2}>
      {teacher.workPlaces.map((position, i) => <Stack key={i} gap={2} direction='row'>
        <Panel gap={4} sx={{width: '100%'}}>
          <SchoolLink school={position.school} />
          <SubjectsEditor
            subjectSlugs={position.subjectSlugs}
            setSubjects={subjects => setTeacher(t => ({
              ...t,
              workPlaces: t.workPlaces.map((p, j) => j === i ? {...p, subjectSlugs: subjects.map(s => s.slug)} : p)
            }))}
            allSubjects={allSubjects.filter(s => teacher.subjectSlugs.includes(s.slug))}
            lang={teacher.account.lang}
            small
            type='position'
          />
          <Stack direction='row' sx={{justifyContent: 'flex-end'}}>
            <Button variant='contained' onClick={() => setTeacher(t => ({
              ...t,
              workPlaces: t.workPlaces.filter((_, j) => i !== j)
            }))}>{t('delete')}</Button>
          </Stack>
        </Panel>
      </Stack>)}
    </Stack>
  </Stack>
}