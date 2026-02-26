'use client'

import { IGroupWithLessons } from "@/interfaces"
import { useMemo } from "react"
import { Link } from '@/i18n';
import { GroupsContainer } from "./container";

//mui components
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface GroupsProps {
  readonly groups: ReadonlyArray<IGroupWithLessons>
}

export function Groups({groups}: GroupsProps) {
  const subjectSlugs = useMemo(() => groups.filter(g => g.order === 1).map(g => g.subjectSlug), [groups])

  return <GroupsContainer groups={groups} subjectSlugs={subjectSlugs} render={group => <>
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
    <Stack gap={1} sx={{my: 4}}>
      {group.students.map((student, k) => <Stack key={k} direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
        <Typography variant='h6'>
          #{k + 1}
        </Typography>
        <Link key={k} href={`/core/profile?userId=${student.user.id}`}>
          <Typography color='primary' variant='h6'>
            {student.user.surname} {student.user.name}
          </Typography>
        </Link>
        <Box />
      </Stack>)}
    </Stack>
  </>} />
}