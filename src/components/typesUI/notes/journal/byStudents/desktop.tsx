'use client'

import { useEffect, useRef } from "react"
import { useJournalContext } from "@/providers";
import { Note } from "../../item";
import { DateButton } from "./dateButton";
import { NotesByStudentsResponsiveProps } from "./wrapper";
import { dateToNormal } from '@/utils/dates';
import { Performance } from "../../performance"

//mui components
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

export function NotesByStudentsDesktop({specificLessons, findNote, pickNote}: NotesByStudentsResponsiveProps) {
  const { groups } = useJournalContext()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const dateCellRefs = useRef<(HTMLTableCellElement | null)[]>([])

  useEffect(() => {
    if (specificLessons.length > 0 && tableContainerRef.current) {
      const today = dateToNormal(new Date())
      let targetIndex = specificLessons.findIndex(specificLesson => specificLesson.date >= today)
      if (targetIndex === -1) {
        targetIndex = specificLessons.length - 1
      }
      
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        const targetCell = dateCellRefs.current[targetIndex]
        if (targetCell && tableContainerRef.current) {
          const container = tableContainerRef.current
          
          // Get the cell's position relative to the viewport
          const cellRect = targetCell.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          
          // Calculate the cell's position relative to the container's scrollable area
          const cellOffsetInContainer = cellRect.left - containerRect.left + container.scrollLeft
          const cellWidth = cellRect.width
          const viewportWidth = containerRect.width
          
          // Calculate scroll position to center the cell
          // Center = cell center position - (viewport width / 2)
          const cellCenter = cellOffsetInContainer + (cellWidth / 2)
          const scrollPosition = cellCenter - (viewportWidth / 2)
          
          container.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth'
          })
        }
      })
    }
  }, [specificLessons])

  return <TableContainer ref={tableContainerRef}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {specificLessons.map((specificLesson, i) => <TableCell 
            key={i}
            ref={el => {
              dateCellRefs.current[i] = el as HTMLTableCellElement | null
            }}
          >
            <DateButton date={specificLesson.date} />
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
          {specificLessons.map((specificLesson, j) => {
            const note = findNote(group.notes, specificLesson)
            return <TableCell key={j} sx={{ textAlign: 'center' }}>
              <Note
                value={note?.value}
                onClick={() => pickNote(group.id, specificLesson.date, specificLesson.lessonTime, note)}
                disabled={!specificLesson.active}
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
            <Performance variant='h6' color='primary' performance={group.performance} />
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </TableContainer>
}