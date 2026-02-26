import type { IDetailedSpecificLesson, IDetailedHomework, INote } from "@/interfaces";

export function extractDataFromSpecificLesson(specificLesson: IDetailedSpecificLesson) {
  const lesson = specificLesson.lesson;
  return {
    schoolSlug: lesson.klassOrGroup.schoolSlug,
    klassOrGroupSlug: lesson.klassOrGroup.slug,
    lessonTimeSlug: lesson.lessonTime.slug,
    date: specificLesson.date
  }
}

export function extractDataFromHomework(homework: IDetailedHomework) {
  const specificLesson = homework.specificLesson;
  const lesson = specificLesson.lesson;
  return {
    schoolSlug: lesson.klassOrGroup.schoolSlug,
    klassOrGroupSlug: lesson.klassOrGroup.slug,
    lessonTimeSlug: lesson.lessonTime.slug,
    date: specificLesson.date,
    studentId: homework.student.id
  }
}

export function extractDataFromNote(note: INote) {
  const lesson = note.specificLesson.lesson;
  return {
    schoolSlug: lesson.klassOrGroup.schoolSlug,
    klassOrGroupSlug: lesson.klassOrGroup.slug,
    lessonTimeSlug: lesson.lessonTime.slug,
    date: note.specificLesson.date
  }
}