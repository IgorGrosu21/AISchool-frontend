'use client'

import { ISchoolWithTimetable } from "@/interfaces"
import { Dispatch, SetStateAction } from "react"
import { GroupsEditor } from "../../groups"
import { useKlassContext } from "@/providers"

interface GroupsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function SchoolGroupsEditor({school, setSchool}: GroupsEditorProps) {
  const { klass } = useKlassContext()

  return <GroupsEditor
    allSubjects={school.subjects}
    staff={school.staff}
    klass={klass}
    updateGroups={groups => setSchool(
      s => ({...s, klasses: s.klasses.map(k => k.id === klass.id ? {...k, groups: groups} : k)})
    )}
  />
}