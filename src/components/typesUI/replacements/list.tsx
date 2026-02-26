'use client'

import { ILessonName, ISchoolWithReplacements } from "@/interfaces";
import { Link } from "@/i18n";
import { ReplacementsContainer } from "./container";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
//icons
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface ReplacementsProps {
  readonly school: Readonly<ISchoolWithReplacements>
  readonly lessons: ReadonlyArray<ILessonName>
}

export function Replacements({school, lessons}: ReplacementsProps) {
  return <ReplacementsContainer
    teachers={school.teachers}
    timetable={school.timetable}
    lessons={lessons}
    render={(lesson, _, replacement) => {
      return <Stack direction='row' sx={{alignItems: 'center'}} gap={2}>
        <Link href={`/core/teachers/${lesson?.teacher?.id}`}>
          <Typography color='primary'>{lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}</Typography>
        </Link>
        <SwapHorizIcon />
        <Box sx={{flex: 1}}>
          {replacement && <Link href={`/core/teachers/${replacement.teacher.id}`}>
            <Typography color='secondary'>
              {replacement.teacher.user.surname ?? ''} {replacement.teacher.user.name ?? ''}
            </Typography>
          </Link>}
        </Box>
      </Stack>
    }}
  />
}