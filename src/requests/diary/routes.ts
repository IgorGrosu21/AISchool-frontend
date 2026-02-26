import type {
  ISchool, IDetailedSchool, ISchoolName,
  IDetailedKlass, IKlassWithLessons, ISchoolWithKlasses, ISchoolWithTimetable,
  IDetailedSpecificLesson, ISpecificLessonName,
  IDetailedHomework,
  INote,
  IReplacementName,
  IPersonDiary, IPersonHome, IPersonJournal, IPersonPermissions, IPersonProfile, IUserAccount,
  IDetailedCountry, ICountryName, IRegionName, ICityName,
  IDetailedMedia
} from '@/interfaces';
import type { GenericRouteTypeRegistry, GenericRouteRegistry } from '../core';
import type {
  CountryInKwargs, RegionInKwargs,

  SubjectInKwargs, LessonAndDateInKwargs, ChildInKwargs, DateRangeInKwargs,
  ChildAndSchoolInQuery, StudentMayBeInQuery,

  UserMayBeInQuery,

  SchoolInKwargs, KlassInKwargs
} from './mixins';
import {
  BY_SUBJECT, BY_DATE, BY_CHILD, BY_DATE_RANGE,
  BY_COUNTRY, BY_REGION,
  BY_SCHOOL, BY_KLASS
} from './mixins';

export type DiaryRouteTypeRegistry = GenericRouteTypeRegistry<{
  // Country
  'country-names': {response: ICountryName[]}
  'region-names': {response: IRegionName[], kwargs: CountryInKwargs}
  'city-names': {response: ICityName[], kwargs: RegionInKwargs}
  'country': {response: IDetailedCountry}
  
  // Lessons
  'replacement-names': {response: IReplacementName[], kwargs: DateRangeInKwargs, params: ChildAndSchoolInQuery},
  'specific-lesson-names': {response: ISpecificLessonName[], kwargs: DateRangeInKwargs, params: ChildAndSchoolInQuery},
  'specific-lesson-details': {response: IDetailedSpecificLesson, kwargs: LessonAndDateInKwargs},
  'specific-lesson-files': {response: IDetailedMedia, kwargs: LessonAndDateInKwargs},
  'homework-details': {response: IDetailedHomework, kwargs: LessonAndDateInKwargs, params: StudentMayBeInQuery},
  'homework-files': {response: IDetailedMedia, kwargs: LessonAndDateInKwargs, params: StudentMayBeInQuery},
  'student-note-list': {response: INote[], kwargs: DateRangeInKwargs},
  'parent-note-list': {response: INote[], kwargs: DateRangeInKwargs & ChildInKwargs},
  'teacher-note-list': {response: INote[], kwargs: DateRangeInKwargs & SubjectInKwargs},
  'notes': {response: INote, kwargs: LessonAndDateInKwargs},
  
  // Person
  'diary': {response: IPersonDiary}
  'home': {response: IPersonHome}
  'journal': {response: IPersonJournal}
  'permissions': {response: IPersonPermissions}
  'profile': {response: IPersonProfile, params: UserMayBeInQuery}
  'account': {response: IUserAccount}

  // Schools
  'school-names': {response: ISchoolName[]}
  'school-list': {response: ISchool[]}
  'school-details': {response: IDetailedSchool, kwargs: SchoolInKwargs}
  'school-photos': {response: IDetailedMedia, kwargs: SchoolInKwargs}
  'school-timetable': {response: ISchoolWithTimetable, kwargs: SchoolInKwargs}
  'school-klasses': {response: ISchoolWithKlasses, kwargs: SchoolInKwargs}
  'klass-details': {response: IDetailedKlass, kwargs: KlassInKwargs}
  'klass-timetable': {response: IKlassWithLessons, kwargs: KlassInKwargs}
}>


export const diaryRouteRegistry: GenericRouteRegistry<DiaryRouteTypeRegistry> = {
  // Country
  'country-names': 'country-names/',
  'region-names': `region-names/${BY_COUNTRY}/`,
  'city-names': `city-names/${BY_REGION}/`,
  'country': 'country/',
  
  // Lessons
  'replacement-names': `replacement-names/${BY_DATE_RANGE}/`,
  'specific-lesson-names': `specific-lesson-names/${BY_DATE_RANGE}/`,
  'specific-lesson-details': `specific-lessons/${BY_DATE}/`,
  'specific-lesson-files': `specific-lesson-files/${BY_DATE}/`,
  'homework-details': `homeworks/${BY_DATE}/`,
  'homework-files': `homework-files/${BY_DATE}/`,
  'student-note-list': `student-note-list/${BY_DATE_RANGE}/`,
  'parent-note-list': `parent-note-list/${BY_CHILD}/${BY_DATE_RANGE}/`,
  'teacher-note-list': `teacher-note-list/${BY_SUBJECT}/${BY_DATE_RANGE}/`,
  'notes': `notes/${BY_DATE}/`,
  
  // Person
  'diary': 'diary/',
  'home': 'home/',
  'journal': 'journal/',
  'permissions': 'permissions/',
  'profile': 'profile/',
  'account': 'account/',

  // Schools
  'school-names': 'school-names/',
  'school-list': 'school-list/',
  'school-details': `schools/${BY_SCHOOL}/`,
  'school-photos': `school-photos/${BY_SCHOOL}/`,
  'school-timetable': `schools/${BY_SCHOOL}/timetable/`,
  'school-klasses': `schools/${BY_SCHOOL}/klasses/`,
  'klass-details': `klasses/${BY_KLASS}/`,
  'klass-timetable': `klasses/${BY_KLASS}/timetable/`,
}
