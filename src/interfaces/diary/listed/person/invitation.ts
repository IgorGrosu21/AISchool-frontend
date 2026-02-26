import type { IStudentName } from "../../name"

export type IParentInvitation = Readonly<{
  student: IStudentName
  token: string
}>

export type IStudentInvitation = Readonly<{
  manager: string
  student: string
}>

export type ITeacherInvitation = Readonly<{
  manager: string
  teacher: string
}>