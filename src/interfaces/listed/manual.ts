import type { ISubjectName } from '../name'

type WithSlug = {
  name: string
  slug: string
}

type Paginated = WithSlug & {
  startPage: number
  endPage: number
}

export type ITask = WithSlug & {
  currency: keyof IBalance
  cost: number
}

export type IBalance = {
  [key: string]: number
  sapphires: number
  rubies: number
  emeralds: number
  diamonds: number
}

export type IModuleWithManual = Paginated &  {
  manual: IManual
}

export type IModule = Omit<IModuleWithManual, 'manual'> & {
  topics: ITopic[]
  balance: IBalance
}

export type ITopic = Paginated & {
  balance: IBalance
}

export type IManual = {
  id: string
  subject: ISubjectName
  grade: number
  slug: string
}