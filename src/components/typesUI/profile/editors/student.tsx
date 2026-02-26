'use client'

import type { IKlassName, IPersonProfile, ISchoolName } from "@/interfaces"
import { Dispatch, SetStateAction, useMemo } from "react";
import { PickSchool, PickKlass } from "@/components";
import { Panel } from "@/ui";

interface StudentEditorProps {
  student: IPersonProfile & { profileType: 'student' }
  setStudent: Dispatch<SetStateAction<IPersonProfile & { profileType: 'student' }>>
  schoolNames: ISchoolName[]
}

export function StudentEditor({ student, setStudent, schoolNames }: StudentEditorProps) {
  const dummyKlass: IKlassName = useMemo(() => ({
    id: '',
    grade: student.klass?.grade ?? 12,
    letter: student.klass?.letter ?? 'A',
    profile: 'R' as const,
    schoolId: '',
    schoolSlug: '',
    slug: '12А',
  }), [student.klass])

  return <>
    <Panel>
      <PickSchool pickedSchoolSlug={student.klass?.schoolSlug} setValue={v => setStudent(
        s => ({...s, klass: s.klass ? {
          ...s.klass,
          schoolSlug: v.slug,
          schoolId: v.id
        } : {...dummyKlass,
          schoolSlug: v.slug,
          schoolId: v.id
        }})
      )} options={schoolNames} />
    </Panel>
    <Panel>
      <PickKlass klass={dummyKlass} setKlass={klass => setStudent(s => ({...s, klass: {...dummyKlass, grade: klass.grade, letter: klass.letter}}))} />
    </Panel>
  </>
}