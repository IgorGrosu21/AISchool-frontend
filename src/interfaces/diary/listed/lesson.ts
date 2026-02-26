import type { IWithFiles, IWithLinks } from '../../media'
import type { ILessonTimeName, ISpecificLessonName, IStudentName, INoteName, IKlassName, IGroupName } from '../name'
import type { ITeacher } from './person'
import type { HasHomeworkId, HasLessonId, HasSubjectName, HasNoteValue, HasStudentId } from '../primitives'

export type ILesson = Readonly<HasSubjectName & {
  id: string
  teacher: ITeacher | null
  lessonTime: ILessonTimeName
  readonly klassOrGroup: IKlassName | IGroupName
}> & ({
  type: 'klass'
  klass: IKlassName
} |{
  type: 'group'
  group: IGroupName
})

export type IHomework = HasStudentId & IWithFiles & IWithLinks & {
  id: string
  comment: string
  readonly lastModified: string
}

export type INote = Omit<INoteName, keyof HasStudentId> & {
  student: IStudentName
  readonly specificLesson: ISpecificLesson
}

export type ISpecificLesson = Omit<
  ISpecificLessonName,
  keyof HasLessonId | keyof HasHomeworkId | keyof HasNoteValue
> & IWithFiles & IWithLinks & {
  readonly lesson: ILesson
}