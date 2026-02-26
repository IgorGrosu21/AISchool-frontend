export type IUserName = {
  id: string
  name: string
  surname: string
}

type IPersonName = {
  id: string
  readonly user: IUserName
}

export type IParentName = IPersonName

export type IStudentName = IPersonName

export type ITeacherName = IPersonName