'use client'

import { ILessonTimeName, INote, IPersonJournal } from "@/interfaces"
import { NotesContainer } from "../container";
import { NotePicker } from "../../picker";
import { useNotesByStudents } from "@/hooks";
import { NotesByStudentsDesktop } from "./desktop";
import { NotesByStudentsMobile } from "./mobile";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

//mui components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";

type SpecificLesson = {
  date: string
  lessonTime: ILessonTimeName
  active: boolean
}

interface NotesByStudentsProps {
  school: (IPersonJournal & { profileType: 'teacher' })['schools'][number]
  klassOrGroup: (IPersonJournal & { profileType: 'teacher' })['schools'][number]['klassesOrGroups'][number]
  subjectSlug: string
}

export interface NotesByStudentsResponsiveProps {
  specificLessons: SpecificLesson[],
  findNote: (notes: INote[], specificLesson: SpecificLesson) => INote | undefined
  pickNote: (studentId: string, date: string, lessonTime: ILessonTimeName, note?: INote) => void
}

export function NotesByStudents({school, klassOrGroup, subjectSlug}: NotesByStudentsProps) {
  const {
    isPending, specificLessons,
    activeNote, setActiveNote, pickNote, updateNote
  } = useNotesByStudents(school, klassOrGroup, subjectSlug)
  const t = useTranslations('journal')

  const findNote = useCallback((notes: INote[], specificLesson: SpecificLesson) => {
    return specificLesson.active ? notes.find(note => (
      note.specificLesson.lesson.lessonTime.slug === specificLesson.lessonTime.slug &&
      note.specificLesson.date === specificLesson.date
    )) : undefined
  }, [])

  const lessonLink = useMemo(() => {
    const specificLesson = activeNote?.specificLesson
    let url = `/core/lessons/${school.slug}/${klassOrGroup.slug}`
    if (specificLesson) {
      url += `/${specificLesson.lesson.lessonTime.slug}/${specificLesson.date}/`
    }
    return url
  }, [activeNote?.specificLesson, school.slug, klassOrGroup.slug])

  return <NotesContainer loading={isPending}>
    <Box sx={{display: {xs: 'none', md: 'block'}}}>
      <Typography variant='h6' color='secondary'>{t('scroll_helper')}</Typography>
      <NotesByStudentsDesktop specificLessons={specificLessons} findNote={findNote} pickNote={pickNote} />
    </Box>
    <Box sx={{display: {xs: 'block', md: 'none'}}}>
      <NotesByStudentsMobile specificLessons={specificLessons} findNote={findNote} pickNote={pickNote} />
    </Box>
    <NotePicker
      notesOpened={activeNote !== undefined}
      closeNotes={() => setActiveNote(undefined)}
      activeNote={activeNote}
      updateNote={note => note && activeNote ? updateNote({
        ...note,
        specificLesson: activeNote.specificLesson,
        student: activeNote.student,
      }) : updateNote(undefined)}
      link={lessonLink}
    />
  </NotesContainer>
}