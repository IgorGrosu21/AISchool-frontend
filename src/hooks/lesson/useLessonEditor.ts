import { IKlassWithLessons, ILessonName, ILessonTimeName, ISubjectName, ITeacherName } from "@/interfaces"
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";


export function useLessonEditor(klass: IKlassWithLessons, setKlass: Dispatch<SetStateAction<IKlassWithLessons>>) {
  const allTeachers = useMemo(() => klass.school.teachers, [klass.school.teachers])

  const getLesson = useCallback((lessonTime: ILessonTimeName) => {
    return [...klass.lessons, ...klass.groups.flatMap(g => g.lessons)].find(l => l.lessonTimeId == lessonTime.id)
  }, [klass])

  const getLessonAndTeachers = useCallback((lessonTime: ILessonTimeName) => {
    const lesson = getLesson(lessonTime)
    if (lesson) {
      const teachers = allTeachers.filter(t => t.subjectSlugs.includes(lesson.subjectSlug))
      const teacher = teachers.find(t => t.id === lesson.teacher?.id) ?? null
      return { lesson, teachers, teacher }
    }
    return { lesson: undefined, teachers: [], teacher: null }
  }, [getLesson, allTeachers])

  const updateSubject = useCallback((lessonTime: ILessonTimeName, subject: ISubjectName | null, lesson?: ILessonName) => {
    if (lesson) {
      if (subject) {
        if (lesson.subjectSlug === subject.slug) {
          // can't happen, because SubjectEditor doesn'trigger on change of the same subject
          return
        }
        if (lesson.type === 'klass') {
          // update existing klass lesson
          return setKlass(k => ({...k, lessons: k.lessons.map(l => l.lessonTimeId === lesson.lessonTimeId ? {
            ...l,
            subjectSlug: subject.slug,
            subjectName: subject.name
          } : l)}))
        }
        setKlass(k => ({...k, groups: k.groups.map(g => {
          if (g.subjectSlug === subject.slug) {
            // update existing group lesson
            return {...g, lessons: [...g.lessons, {
              ...lesson,
              subjectSlug: subject.slug,
              subjectName: subject.name
            }]}
          } else if (g.subjectSlug === lesson.subjectSlug) {
            // delete old group lesson
            return {...g, lessons: g.lessons.filter(l => l.lessonTimeId !== lesson.lessonTimeId)} 
          }
          return g
        })}))
      } else {
        if (lesson.type === 'klass') {
          // delete existing klass lesson
          return setKlass(k => ({...k, lessons: k.lessons.filter(l => l.lessonTimeId !== lesson.lessonTimeId)}))
        }
        setKlass(k => ({...k, groups: k.groups.map(g => {
          if (g.subjectSlug === lesson.subjectSlug) {
            // delete old group lesson
            return {...g, lessons: g.lessons.filter(l => l.lessonTimeId !== lesson.lessonTimeId)} 
          }
          return g
        })}))
      }
    } else if (subject) {
      const existingGroups = klass.groups.filter(g => g.subjectSlug === subject.slug)
      const newLesson = {
        id: '',
        lessonTimeId: lessonTime.id,
        lessonTimeSlug: lessonTime.slug,
        subjectSlug: subject.slug,
        subjectName: subject.name,
      }
      if (existingGroups.length > 0) {
        // subjectSlug belongs to an existing group
        return setKlass(k => ({...k, groups: k.groups.map(g => existingGroups.includes(g) ? {
          ...g,
          lessons: [...g.lessons, {
            ...newLesson,
            teacher: g.teacher,
            type: 'group',
            groupId: g.id,
            groupSlug: g.slug,
            klassOrGroupSlug: g.slug,
          }]
        } : g)}))
      }
      // subjectSlug doesn't belong to any existing group, so create it inside the klass
      setKlass(k => ({...k, lessons: [...k.lessons, {
        ...newLesson,
        teacher: null,
        type: 'klass',
        klassId: k.id,
        klassSlug: k.slug,
        klassOrGroupSlug: k.slug,
      }]}))
    }
  }, [klass, setKlass])

  const updateTeacher = useCallback((teacher: ITeacherName | null, lesson?: ILessonName) => {
    if (lesson === undefined) {
      //ui can't call this method when lesson is undefined
      return
    }
    if (lesson.type === 'group') {
      //ui can't call this method if lesson type is group
      return
    }
    setKlass(k => ({...k, lessons: k.lessons.map(l => l.lessonTimeId === lesson.lessonTimeId ? {
      ...l,
      teacher: teacher
    } : l)}))
  }, [setKlass])

  return { getLessonAndTeachers, updateSubject, updateTeacher }
}