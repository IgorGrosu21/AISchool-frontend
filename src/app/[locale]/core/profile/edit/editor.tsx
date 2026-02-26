'use client'

import { useProfileEditorContext } from "@/providers";
import { IPersonProfile, ISchoolName, ISubject } from "@/interfaces";
import { ParentEditor, StudentEditor, TeacherEditor } from "@/components";

interface EditorProps {
  schoolNames: ISchoolName[]
  allSubjects: ISubject[]
}

export function Editor({ schoolNames, allSubjects }: EditorProps) {
  const { instance: person, setInstance: setPerson } = useProfileEditorContext()

  if (person.profileType === 'parent') {
    return <ParentEditor
      parent={person}
      setParent={p => setPerson(p as IPersonProfile & { profileType: 'parent' })}
    />
  }
  if (person.profileType === 'student') {
    return <StudentEditor
      student={person}
      setStudent={p => setPerson(p as IPersonProfile & { profileType: 'student' })}
      schoolNames={schoolNames}
    />
  }
  return <TeacherEditor
    teacher={person}
    setTeacher={p => setPerson(p as IPersonProfile & { profileType: 'teacher' })}
    schoolNames={schoolNames}
    allSubjects={allSubjects}
  />
}
