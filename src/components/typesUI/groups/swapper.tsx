'use client'

import { IDetailedKlass, IGroup } from "@/interfaces"
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { GroupsContainer } from "./container";
import { Link } from '@/i18n';
import { useGroupStudentSwapper } from "@/hooks";

//mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

interface GroupsStudentsSwapperProps {
  klass: IDetailedKlass
  setKlass: Dispatch<SetStateAction<IDetailedKlass>>
}

export function GroupsStudentsSwapper({klass, setKlass}: GroupsStudentsSwapperProps) {
  const groups = useMemo(() => klass.groups, [klass.groups])
  const groupSubjectSlugs = useMemo(() => {
    return groups.filter(g => g.order === 1).map(g => g.subjectSlug)
  }, [groups])

  const updateGroups = useCallback((groups: IGroup[]) => {
    setKlass(k => ({...k, groups}))
  }, [setKlass])

  const swapStudent = useGroupStudentSwapper(groups, updateGroups)

  return <Stack gap={8}>
    <GroupsContainer groups={groups} subjectSlugs={groupSubjectSlugs} render={group => <>
      <Stack direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
        <Typography variant='h5'>
          #{group.order}
        </Typography>
        <Link href={`/core/profile?userId=${group.teacher?.user.id}`}>
          <Typography color='primary' variant='h5'>
            {group.teacher?.user.surname ?? ''} {group.teacher?.user.name ?? ''}
          </Typography>
        </Link>
        <Box />
      </Stack>
      <Divider />
      <Stack gap={1} sx={{my: 2, p: 2}}>
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
    </>} />
  </Stack>
}