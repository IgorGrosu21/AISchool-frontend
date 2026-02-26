import type { IWithFilesData } from "../../media"
import type { IHomework, IStudent, ISpecificLesson, ILesson } from "../listed"
import type { HasStudentId } from "../primitives"
import type { INoteName } from "../name"

export type IDetailedSpecificLesson = Omit<ISpecificLesson, 'lesson'> & IWithFilesData & {
  lesson: ILesson
  readonly notes: ReadonlyArray<INoteName>
  readonly students: ReadonlyArray<IStudent>
  readonly homeworks: ReadonlyArray<IHomework>
}

export type IDetailedHomework = Omit<IHomework, keyof HasStudentId> & IWithFilesData & {
  specificLesson: ISpecificLesson
  readonly note: INoteName | null
  readonly student: IStudent
}