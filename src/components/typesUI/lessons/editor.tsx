'use client'

import { IKlassWithLessons, ISubject } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
import { TimetableContainer } from "../lessonsTime";
import { Lesson } from "./item";
import { TeachersPicker } from "../teachers";
import { SubjectsPicker } from "../subjects";
import { useLessonEditor } from "@/hooks";

interface LessonsEditorProps {
  readonly allSubjects: ReadonlyArray<ISubject>
  klass: IKlassWithLessons
  setKlass: Dispatch<SetStateAction<IKlassWithLessons>>
}

export function LessonsEditor({allSubjects, klass, setKlass}: LessonsEditorProps) {
  const { getLessonAndTeachers, updateSubject, updateTeacher } = useLessonEditor(klass, setKlass)

  return <TimetableContainer timetable={klass.school.timetable} render={lessonTime => {
    const { lesson, teachers, teacher } = getLessonAndTeachers(lessonTime)
    
    return <Lesson
      key={lessonTime.order}
      lessonTime={lessonTime}
      lesson={lesson}
      showSubject={false}
      direction={{xs: 'column', md: 'row'}}
      sx={{flex: 1}}
    >
      <SubjectsPicker
        allSubjects={allSubjects}
        pickedSubjectSlug={lesson?.subjectSlug}
        onChange={s => updateSubject(lessonTime, s, lesson)}
        sx={{transition: '0.5s', flex: 1}}
      />
      <TeachersPicker
        teachers={teachers}
        pickedTeacher={teacher}
        onChange={t => t ? updateTeacher(t, lesson) : {}}
        sx={{
        transition: '0.5s',
        ...(lesson?.type === 'group' ? {display: 'none'} : (teachers.length === 0 ? {} : {flex: 1}))
      }} />
    </Lesson>
  }} />
}