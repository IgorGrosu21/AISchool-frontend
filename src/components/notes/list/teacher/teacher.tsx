'use client'

import { IDetailedKlass, INote } from "@/interfaces"
import { NotesContainer } from "../../container";
import { NotePicker } from "../../picker";
import { useTeacherNotes } from "@/hooks";
import { TeacherNoteListDesktop } from "./teacherDesktop";
import { TeacherNoteListMobile } from "./teacherMobile";
import { useCallback } from "react";
import { format, isAfter } from "date-fns";
import { type Group } from "@/providers";

//mui components
import Box from "@mui/material/Box"

interface TeacherNoteListProps {
  klass: IDetailedKlass
  subjectSlug: string
}

export function TeacherNoteList({klass, subjectSlug}: TeacherNoteListProps) {
  const {
    isPending, today, lessons,
    activeNote, setActiveNote, pickNote, updateNote
  } = useTeacherNotes(klass, subjectSlug)

  const getNoteInfo = useCallback((group: Group, lesson: typeof lessons[number]) => {
    const note = group.notes.find(n => 
      n.specificLesson.lesson.id === lesson.lesson.id &&
      n.student.id === group.id &&
      n.specificLesson.date === format(lesson.date, 'y.MM.dd')
    )
    const lessonDate = new Date(lesson.date)
    const isFutureLesson = isAfter(lessonDate, today)

    return { note, lessonDate, isFutureLesson }
  }, [today])

  return <NotesContainer loading={isPending}>
    <Box sx={{display: {xs: 'none', md: 'block'}}}>
      <TeacherNoteListDesktop lessons={lessons} pickNote={pickNote} getNoteInfo={getNoteInfo} />
    </Box>
    <Box sx={{display: {xs: 'block', md: 'none'}}}>
      <TeacherNoteListMobile lessons={lessons} pickNote={pickNote} getNoteInfo={getNoteInfo} />
    </Box>
    <NotePicker<INote>
      notesOpened={activeNote !== undefined}
      closeNotes={() => setActiveNote(undefined)}
      activeNote={activeNote}
      updateNote={updateNote}
      hasNotes={activeNote?.specificLesson.lesson.subject.hasNotes ?? true}
      link={`/core/lessons/${klass.school.slug}/${klass.slug}/${activeNote?.specificLesson.lesson.id}/${activeNote?.specificLesson.date}/`}
    />
  </NotesContainer>
}