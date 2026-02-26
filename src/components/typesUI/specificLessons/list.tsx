'use client'

import { ILessonName, ISpecificLessonName, IReplacementName } from "@/interfaces";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n";
import { dateToDayAndMonth, dateToNormal } from "@/utils/dates";
import { useDiaryContext } from "@/providers";
import { TimetableContainer } from "../lessonsTime";
import { useHolidayChecker } from "@/hooks";
import { SpecificLesson } from "./item";

//mui components
import Alert from "@mui/material/Alert"
import Slide, { type SlideProps } from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface SpecificLessonsProps {
  replacements: IReplacementName[]
  specificLessons: ISpecificLessonName[]
  dates: Date[]
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export function SpecificLessons({replacements, specificLessons, dates}: SpecificLessonsProps) {
  const { timetable, lessons, profileType, schoolSlug, childId, holidays } = useDiaryContext()
  const t = useTranslations('specific_lessons')
  const [message, setMessage] = useState<string>('no_lesson')
  const [alertShowed, showAlert] = useState<boolean>(false)
  const isHoliday = useHolidayChecker(holidays)
  const router = useRouter()

  const pickSpecificLesson = useCallback((lesson: ILessonName | undefined, specificLesson: ISpecificLessonName | undefined, date: Date) => {
    if (!lesson) {
      showAlert(true)
      return setMessage('no_lesson')
    }

    let urlEnding = `/${schoolSlug}/${lesson.klassOrGroupSlug}/${lesson.lessonTimeSlug}`
    if (specificLesson) {
      urlEnding += `/${specificLesson.date}`
    } else {
      urlEnding += `/${dateToNormal(date)}`
    }

    if (profileType == 'teacher') {
      return router.push(`/core/lessons/${urlEnding}`)
    }
    if (!specificLesson) {
      showAlert(true)
      return setMessage('no_specific_lesson')
    }

    let homeworkUrl = `/core/homeworks/${urlEnding}`
    if (profileType === 'parent') {
      homeworkUrl += `?studentId=${childId}`
    }
    router.push(homeworkUrl)
  }, [profileType, childId, router, schoolSlug])

  return <Stack>
    <TimetableContainer timetable={timetable} dates={dates.map(d => dateToDayAndMonth(d))} render={(lessonTime, groupIndex) => {
      if (isHoliday(dates[lessonTime.order])) {
        return <Typography key={lessonTime.order} variant='h5' color='primary' sx={{textAlign: 'center'}}>
          {t('holiday')}
        </Typography>
      }
      let lesson = lessons.find(l => l.lessonTimeId === lessonTime.id)
      const replacement = replacements.find(r => r.lesson.lessonTimeId === lessonTime.id)
      if (replacement) {
        lesson = replacement.lesson
      }
      const specificLesson = lesson ? specificLessons.find(sl => sl.lessonId === lesson.id) : undefined

      return <SpecificLesson
        key={lessonTime.order}
        lessonTime={lessonTime}
        lesson={lesson}
        specificLesson={specificLesson}
        profileType={profileType}
        isReplacement={replacement !== undefined}
        onClick={() => pickSpecificLesson(lesson, specificLesson, dates[groupIndex])}
      />
    }} />
    <Snackbar
      open={alertShowed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => showAlert(false)}
      TransitionComponent={SlideTransition}
      autoHideDuration={5000}
    >
      <Alert sx={{bgcolor: 'primary.main'}} variant="filled">{t(message)}</Alert>
    </Snackbar>
  </Stack>
}