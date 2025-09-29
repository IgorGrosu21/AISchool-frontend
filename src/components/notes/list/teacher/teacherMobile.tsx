'use client'

import { ILessonName, ILessonTimeName, INote } from "@/interfaces"
import { Stack, Box, Grid2 } from "@mui/material"
import { type Group, useJournalContext } from "@/providers";
import { Note } from "../../item";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Panel } from "@/ui";
import { StudentsPicker } from "@/components";
import { format } from 'date-fns';
import { DateButton } from "./dateButton";

type ILessonWithDate = {
  lesson: Omit<ILessonName, 'lessonTime'> & {lessonTime?: ILessonTimeName}
  date: string
}

interface TeacherNoteListMobileProps {
  lessons: ILessonWithDate[],
  pickNote: (group: string, date: string, lesson: ILessonWithDate['lesson'], note?: INote) => void
  getNoteInfo: (group: Group, lesson: ILessonWithDate) => { note: INote | undefined, isFutureLesson: boolean }
}

export function TeacherNoteListMobile({lessons, pickNote, getNoteInfo}: TeacherNoteListMobileProps) {
  const { groups } = useJournalContext()
  const studentsPickerRef = useRef<HTMLDivElement | null>(null)
  const [activeGroup, setActiveGroup] = useState<Group>(groups[0])

  useEffect(() => {
    setActiveGroup(groups[0])
  }, [groups])

  const activeStudent = useMemo(() => activeGroup.name, [activeGroup])

  const setActiveStudent = useCallback((name: string) => {
    setActiveGroup(group => groups.find(group => group.name === name) ?? group)
  }, [groups])
  
  return <Stack gap={4}>
    <Box ref={studentsPickerRef}>
      <Panel direction='row' gap={{xs: 2, md:4}} sx={{flexGrow: 0, justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
        <StudentsPicker
          anchorEl={studentsPickerRef.current}
          students={groups.map(group => group.name)}
          activeStudent={activeStudent}
          setActiveStudent={setActiveStudent}
        />
        <Box sx={{flex: 1, display: {xs: 'none', md: 'block'}}} />
        <Note value={activeGroup.performance} big />
      </Panel>
    </Box>
    <Grid2 container columnSpacing={2} rowSpacing={4} columns={{xs: 2, sm: 3}}>
      {lessons.map((lessonWithDate, i) => {
          const { note, isFutureLesson } = getNoteInfo(activeGroup, lessonWithDate)
          return <Grid2 size={1} key={i}>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
              <DateButton date={lessonWithDate.date} />
              <Note
                value={note?.value}
                onClick={() => pickNote(activeGroup.id, format(lessonWithDate.date, 'y.MM.dd'), lessonWithDate.lesson, note)}
                disabled={isFutureLesson}
              />
            </Stack>
          </Grid2>
        })}
    </Grid2>
  </Stack>
}