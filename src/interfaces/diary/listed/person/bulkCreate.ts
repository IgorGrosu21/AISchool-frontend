type IPersonBulkCreate = Readonly<{
  email: string
  password?: string
  name: string
  surname: string
}>

export type IParentBulkCreate = IPersonBulkCreate & Readonly<{
  studentIds: string[]
}>

export type IStudentBulkCreate = IPersonBulkCreate & Readonly<{
  isManager: boolean
}>

export type ITeacherBulkCreate = IPersonBulkCreate & Readonly<{
  subjectSlugs: string[]
  isManager: boolean
}>