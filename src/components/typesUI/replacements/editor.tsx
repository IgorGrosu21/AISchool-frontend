'use client'

import { ILessonName, ISchoolWithReplacements } from "@/interfaces";
import { dateToNormal } from "@/utils/dates";
import { TeachersPicker } from "../teachers";
import { ReplacementsContainer } from "./container";
import { useReplacementsEditor } from "@/hooks";

interface ReplacementsEditorProps {
  school: ISchoolWithReplacements
  setSchool: (school: ISchoolWithReplacements) => void
  readonly lessons: ReadonlyArray<ILessonName>
}

export function ReplacementsEditor({school, setSchool, lessons}: ReplacementsEditorProps) {
  const { createReplacement, updateReplacement, deleteReplacement } = useReplacementsEditor(school, setSchool)

  return <ReplacementsContainer
    teachers={school.teachers}
    timetable={school.timetable}
    lessons={lessons}
    render={(lesson, date, replacement) => {
      return <TeachersPicker
        teachers={school.teachers}
        pickedTeacher={replacement?.teacher ?? null}
        onChange={t => {
          if (t) {
            if (replacement) {
              updateReplacement(replacement, t)
            } else {
              createReplacement(lesson, dateToNormal(date), t)
            }
          } else if (replacement) {
            deleteReplacement(replacement)
          }
        }}
      />
    }}
  />
}
