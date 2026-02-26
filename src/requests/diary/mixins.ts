const COUNTRY_KWARG = 'countrySlug'
const REGION_KWARG = 'regionSlug'

export const BY_COUNTRY = `<${COUNTRY_KWARG}>`
export const BY_REGION = `${BY_COUNTRY}/<${REGION_KWARG}>`

export type CountryInKwargs = { [COUNTRY_KWARG]: string }
export type RegionInKwargs = CountryInKwargs & { [REGION_KWARG]: string }




const USER_ID_QUERY = 'userId'

export type UserMayBeInQuery = { [USER_ID_QUERY]?: string }



const SCHOOL_KWARG = 'schoolSlug'
const KLASS_KWARG = `klassSlug`

export const BY_SCHOOL = `<${SCHOOL_KWARG}>`
export const BY_KLASS = `${BY_SCHOOL}/<${KLASS_KWARG}>`

export type SchoolInKwargs = { [SCHOOL_KWARG]: string }
export type KlassInKwargs = SchoolInKwargs & { [KLASS_KWARG]: string }




const SUBJECT_KWARG = `subjectSlug`
const KLASS_OR_GROUP_KWARG = `klassOrGroupSlug`
const LESSON_KWARG = `lessonTimeSlug`
const DATE_KWARG = `date`
const CHILD_KWARG = 'childId'
const DATE_RANGE_KWARG = 'dateRange'

export const BY_SUBJECT = `${BY_KLASS}/<${SUBJECT_KWARG}>`
export const BY_KLASS_OR_GROUP = `${BY_SCHOOL}/<${KLASS_OR_GROUP_KWARG}>`
export const BY_LESSON = `${BY_KLASS_OR_GROUP}/<${LESSON_KWARG}>`
export const BY_DATE = `${BY_LESSON}/<${DATE_KWARG}>`
export const BY_CHILD = `<${CHILD_KWARG}>`
export const BY_DATE_RANGE = `<${DATE_RANGE_KWARG}>`

export type SubjectInKwargs = KlassInKwargs & { [SUBJECT_KWARG]: string }
export type KlassOrGroupInKwargs = SchoolInKwargs & { [KLASS_OR_GROUP_KWARG]: string }
export type LessonInKwargs = KlassOrGroupInKwargs & { [LESSON_KWARG]: string }
export type LessonAndDateInKwargs = LessonInKwargs & { [DATE_KWARG]: string }
export type ChildInKwargs = { [CHILD_KWARG]: string }
export type DateRangeInKwargs = { [DATE_RANGE_KWARG]: string }


const SCHOOL_ID_QUERY = 'schoolSlug'
const CHILD_ID_QUERY = 'childId'
const STUDENT_ID_QUERY = 'studentId'

export type ChildAndSchoolInQuery = { [SCHOOL_ID_QUERY]?: string, [CHILD_ID_QUERY]?: string }
export type StudentMayBeInQuery = { [STUDENT_ID_QUERY]?: string }