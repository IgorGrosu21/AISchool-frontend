import type { ILessonTimeName } from "../../name"
import type { IHolidays } from "../../primitives"

export type ISchoolWithHolidays = Readonly<{
  slug: string
  holidays: ReadonlyArray<IHolidays>
  timetable: ReadonlyArray<ILessonTimeName>
}>

export type ISubject = Readonly<{
  slug: string
  name: string
}>