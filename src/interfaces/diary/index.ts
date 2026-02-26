export type { IDetailedCity, IDetailedRegion, IDetailedCountry } from './detailed/country'
export type { IDetailedSpecificLesson, IDetailedHomework } from './detailed/lesson'
export type { IUserAccount, IPersonHome, IPersonJournal, IPersonDiary, IPersonPermissions, IPersonProfile } from './detailed/person'
export type { IKlassWithLessons, IDetailedKlass, IDetailedSchool, ISchoolWithKlasses, ISchoolWithTimetable } from './detailed/school'

export type { ICity, IRegion } from './listed/country'
export type { IHomework, ILesson, INote, ISpecificLesson } from './listed/lesson'
export type {
  IUser, IParent, IStudent, IStudentWithKlass, ITeacher, ITeacherWithReplacements,
  IParentBulkCreate, IStudentBulkCreate, ITeacherBulkCreate,
  IParentInvitation, IStudentInvitation, ITeacherInvitation
} from './listed/person'
export type { IPosition, ISchool, ISchoolWithReplacements, IGroupWithLessons, IGroup } from './listed/school'

export type { ICityName, IRegionName, ICountryName } from './name/country'
export type { ILessonTimeName, ILessonName, INoteName, IReplacementName, ISpecificLessonName } from './name/lesson'
export type { IUserName, IParentName, IStudentName, ITeacherName } from './name/person'
export type { IGroupName, ISchoolName, IKlassName } from './name/school'