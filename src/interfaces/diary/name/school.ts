import type { IMedia } from '../../media'
import type { HasSchoolSlug, HasKlassSlug, HasSubjectName } from '../primitives'

export type ISchoolName = {
  id: string
  name: string
  slug: string
  readonly preview: IMedia | null
}

export type IKlassName = HasSchoolSlug & {
  id: string
  grade: number
  letter: string
  profile: 'R' | 'U'
  slug: string
}

export type IGroupName = HasSchoolSlug & HasKlassSlug & HasSubjectName & {
  id: string
  order: number
  slug: string
}