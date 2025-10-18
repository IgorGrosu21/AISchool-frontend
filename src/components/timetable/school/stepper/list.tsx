'use server'

import { ISchoolWithTimetable } from '@/interfaces'
import { LessonTime } from '../lessonsTime'
import { SchoolLessons } from '../lessons'
import { TimetableStepperContainer } from './container'
import { SchoolGroups } from '../groups'
import { Subjects } from '../subjects'

interface TimetableStepperProps {
  school: ISchoolWithTimetable
}

export async function TimetableStepper({school}: TimetableStepperProps) {
  return <TimetableStepperContainer
    school={school}
    subjectsComponent={<Subjects key={0} subjects={school.subjects} />}
    lessonTimeComponent={<LessonTime key={1} timetable={school.timetable} />}
    groupComponent={<SchoolGroups key={2} />}
    lessonsComponent={<SchoolLessons key={3} school={school} />}
  />
}