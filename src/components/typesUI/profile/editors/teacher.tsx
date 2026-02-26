'use client'

import type { IPersonProfile, ISchoolName, ISubject } from "@/interfaces"
import { SubjectsEditor, TeacherPositionsEditor, ExperienceEditor } from "@/components";
import { Panel } from "@/ui";
import { Dispatch, SetStateAction } from "react";

interface TeacherEditorProps {
  teacher: IPersonProfile & { profileType: 'teacher' }
  setTeacher: Dispatch<SetStateAction<IPersonProfile & { profileType: 'teacher' }>>
  schoolNames: ISchoolName[]
  allSubjects: ISubject[]
}

export function TeacherEditor({ teacher, setTeacher, schoolNames, allSubjects }: TeacherEditorProps) {
  return <>
    <Panel>
      <ExperienceEditor teacher={teacher} setTeacher={setTeacher} />
    </Panel>
    <Panel>
      <SubjectsEditor
        subjectSlugs={teacher.subjectSlugs}
        setSubjects={subjects => setTeacher(t => ({...t, subjectSlugs: subjects.map(s => s.slug)}))}
        allSubjects={allSubjects}
        lang={teacher.account.lang}
        type='position'
      />
    </Panel>
    <TeacherPositionsEditor teacher={teacher} setTeacher={setTeacher} schoolNames={schoolNames} allSubjects={allSubjects} />
  </>
}