'use client'

import { ISubject, IKlassWithLessons } from "@/interfaces"
import { Dispatch, SetStateAction, useMemo } from "react";
import { SubjectsEditor } from "@/components";
import { GroupsContainer } from "./container";
import { useGroupsEditor } from "@/hooks";
import { TeachersPicker } from "../teachers";

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Panel } from "@/ui";

interface GroupsEditorProps {
  readonly allSubjects: ReadonlyArray<ISubject>
  klass: IKlassWithLessons
  setKlass: Dispatch<SetStateAction<IKlassWithLessons>>
}

export function GroupsEditor({allSubjects, klass, setKlass}: GroupsEditorProps) {
  const groups = useMemo(() => klass.groups, [klass.groups])
  const groupSubjectSlugs = useMemo(() => {
    return groups.filter(g => g.order === 1).map(g => g.subjectSlug)
  }, [groups])
  const { updateSubjects, updateTeacher, swapStudent } = useGroupsEditor(klass, setKlass)

  return <Stack gap={8}>
    <Panel>
      <SubjectsEditor
        subjectSlugs={groupSubjectSlugs}
        setSubjects={updateSubjects}
        allSubjects={allSubjects}
        lang={klass.school.lang}
        small
      />
    </Panel>
    <GroupsContainer groups={groups} subjectSlugs={groupSubjectSlugs} render={group => {
      const teachers = klass.school.teachers.filter(t => t.subjectSlugs.includes(group.subjectSlug))
      return <>
        {teachers ? <TeachersPicker
          teachers={teachers}
          pickedTeacher={group.teacher}
          onChange={t => updateTeacher(group, t)}
        /> : <Typography color='primary' variant='h5'>
          {group.teacher?.user.surname ?? ''} {group.teacher?.user.name ?? ''}
        </Typography>}
        <Stack gap={1} sx={{p: 2}}>
          {group.students.map((student, k) => <Button
            key={k}
            sx={{justifyContent: 'space-between', alignItems: 'center'}}
            onClick={() => swapStudent(student, group)}
          >
            <ArrowBackIcon color='primary' sx={{opacity: group.order === 1 ? 0 : 1}} />
            <Typography variant='h6'>{student.user.surname} {student.user.name}</Typography>
            <ArrowForwardIcon color='primary' sx={{opacity: group.order === 2 ? 0 : 1}} />
          </Button>)}
        </Stack>
      </>
    }} />
  </Stack>
}