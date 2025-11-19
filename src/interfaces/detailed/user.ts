import type { IUser, ISocial, ICity } from '../listed'
import type { ICanEdit } from './canEdit'

export type IDetailedUser = IUser & ICanEdit & {
  type: 'student' | 'teacher' | 'parent'
  socials: ISocial[]
  city: ICity
  lang: string
}

export type IUserRoutes = IUser & {
  klassLink?: string
  schoolLink?: string
  diaryLink?: string
  journalLink?: string
}