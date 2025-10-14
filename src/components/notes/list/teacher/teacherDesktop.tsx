'use client'

import { ILessonName, ILessonTimeName, INote } from "@/interfaces"
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { format } from 'date-fns';
import { useEffect, useRef } from "react"
import { useJournalContext, type Group } from "@/providers";
import { Note } from "../../item";
import { DateButton } from "./dateButton";

type ILessonWithDate = {
  lesson: Omit<ILessonName, 'lessonTime'> & {lessonTime?: ILessonTimeName}
  date: string
}

interface TeacherNoteListDesktopProps {
  lessons: ILessonWithDate[],
  pickNote: (group: string, date: string, lesson: ILessonWithDate['lesson'], note?: INote) => void
  getNoteInfo: (group: Group, lesson: ILessonWithDate) => { note: INote | undefined, isFutureLesson: boolean }
}

export function TeacherNoteListDesktop({lessons, pickNote, getNoteInfo}: TeacherNoteListDesktopProps) {
  const { groups } = useJournalContext()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lessons.length > 0 && tableContainerRef.current) {
      const currentDate = new Date(2025, 2, 25)
      const currentDateStr = format(currentDate, 'y.M.d')
      
      let targetIndex = lessons.findIndex(lesson => lesson.date >= currentDateStr)
      if (targetIndex === -1) {
        targetIndex = lessons.length - 1
      }
      
      const percentage = (targetIndex / (lessons.length - 1)) * 100
      const scrollableWidth = tableContainerRef.current.scrollWidth - tableContainerRef.current.clientWidth
      const scrollPosition = (percentage / 100) * scrollableWidth
      
      tableContainerRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }, [lessons])

  return <TableContainer ref={tableContainerRef} sx={{display: {xs: 'none', md: 'block'}}}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {lessons.map((lesson, i) => <TableCell key={i}>
            <DateButton date={lesson.date} />
          </TableCell>)}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groups.map((group, i) => <TableRow key={i} hover>
          <TableCell sx={[{
            position: 'sticky',
            left: 0,
            zIndex: 2,
            bgcolor: 'rgba(233, 242, 247, 0.5)',
          }, theme => theme.applyStyles('dark', {
            bgcolor: 'rgba(8, 8, 22, 0.5)'
          })]}>
            <Typography variant='h6' color='primary'>{group.name}</Typography>
          </TableCell>
          {lessons.map((lessonWithDate, j) => {
            const { note, isFutureLesson } = getNoteInfo(group, lessonWithDate)
            
            return <TableCell key={j} sx={{ textAlign: 'center' }}>
              <Note
                value={note?.value}
                onClick={() => pickNote(group.id, format(lessonWithDate.date, 'y.MM.dd'), lessonWithDate.lesson, note)}
                disabled={isFutureLesson}
              />
            </TableCell>
          })}
          <TableCell sx={[{
            position: 'sticky',
            right: 0,
            zIndex: 2,
            bgcolor: 'rgba(233, 242, 247, 0.5)',
          }, theme => theme.applyStyles('dark', {
            bgcolor: 'rgba(8, 8, 22, 0.5)'
          })]}>
            <Typography variant='h6' color='primary'>
              {group.performance}
            </Typography>
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </TableContainer>
}