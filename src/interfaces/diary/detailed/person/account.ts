import type { IUser, ICity } from '../../listed'

export type IUserAccount = IUser & {
  socials: string[]
  city: ICity
  lang: string
  profileType: 'student' | 'teacher' | 'parent'
}