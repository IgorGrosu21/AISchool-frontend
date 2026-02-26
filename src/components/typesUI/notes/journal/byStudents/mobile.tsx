'use client'

import { useJournalContext } from "@/providers";
import { Note } from "../../item";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Panel } from "@/ui";
import { StudentsPicker } from "@/components";
import { DateButton } from "./dateButton";
import { NotesByStudentsResponsiveProps } from "./wrapper";

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"

export function NotesByStudentsMobile({specificLessons, findNote, pickNote}: NotesByStudentsResponsiveProps) {
  const { groups } = useJournalContext()
  const [studentsPickerAnchor, setStudentsPickerAnchor] = useState<HTMLDivElement | null>(null)
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0)

  useEffect(() => {
    setActiveGroupIndex(0)
  }, [groups])

  const activeGroup = useMemo(() => groups[activeGroupIndex], [groups, activeGroupIndex])
  const activeStudent = useMemo(() => activeGroup.name, [activeGroup])

  const setActiveStudent = useCallback((name: string) => {
    const index = groups.findIndex(group => group.name === name)
    setActiveGroupIndex(index === -1 ? 0 : index)
  }, [groups])
  
  return <Stack gap={4}>
    <Box ref={(el: HTMLDivElement | null) => setStudentsPickerAnchor(el)} sx={{position: 'relative'}}>
      <Panel
        direction='row'
        gap={{xs: 2, md: 4}}
        sx={{flexGrow: 0, justifyContent: 'space-between', alignItems: 'center'}}
      >
        <StudentsPicker
          anchorEl={studentsPickerAnchor}
          students={groups.map(group => group.name)}
          activeStudent={activeStudent}
          setActiveStudent={setActiveStudent}
        />
        <Box sx={{flex: 1, display: {xs: 'none', md: 'block'}}} />
        <Note value={activeGroup.performance} big />
      </Panel>
    </Box>
    <Grid2 container columnSpacing={2} rowSpacing={4} columns={{xs: 2, sm: 3}}>
      {specificLessons.filter(specificLesson => specificLesson.active).map((specificLesson, i) => {
        const note = findNote(activeGroup.notes, specificLesson)
        return <Grid2 size={1} key={i}>
          <Stack direction='row' sx={{justifyContent: 'space-between'}}>
            <DateButton date={specificLesson.date} />
            <Note
              value={note?.value}
              onClick={() => pickNote(activeGroup.id, specificLesson.date, specificLesson.lessonTime, note)}
              disabled={!specificLesson.active}
            />
          </Stack>
        </Grid2>
      })}
    </Grid2>
  </Stack>
}