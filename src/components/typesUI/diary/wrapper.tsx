"use client";

import { IPersonDiary } from "@/interfaces";
import { CalendarProvider, DiaryProvider } from "@/providers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "./calendar";
import { useQueryParams } from "@/hooks";

interface DiaryWrapperProps {
  schoolSlug?: string;
  childId?: string;
  date: Date;
  personDiary: IPersonDiary;
}

export function DiaryWrapper({
  schoolSlug,
  childId,
  date,
  personDiary,
}: DiaryWrapperProps) {
  const [pickedSchoolSlug, setPickedSchoolSlug] = useState<string | undefined>(
    schoolSlug,
  );
  const [pickedChildId, setPickedChildId] = useState<string | undefined>(
    childId,
  );
  const updateQueryParam = useQueryParams();

  const updatePickedSchoolSlug = useCallback(
    (schoolSlug?: string) => {
      setPickedSchoolSlug(schoolSlug);
      updateQueryParam("schoolSlug", schoolSlug);
    },
    [updateQueryParam],
  );

  const updatePickedChildId = useCallback(
    (childId?: string) => {
      setPickedChildId(childId);
      updateQueryParam("childId", childId);
    },
    [updateQueryParam],
  );

  useEffect(() => {
    if (schoolSlug) {
      updatePickedSchoolSlug(schoolSlug);
    }
  }, [schoolSlug, updatePickedSchoolSlug]);

  useEffect(() => {
    if (childId) {
      updatePickedChildId(childId);
    }
  }, [childId, updatePickedChildId]);

  const pickedSchool = useMemo(() => {
    switch (personDiary.profileType) {
      case "student":
        return personDiary.school;
      case "teacher":
        return pickedSchoolSlug
          ? personDiary.schools.find(
              (school) => school.slug === pickedSchoolSlug,
            )!
          : undefined;
      case "parent":
        return pickedChildId
          ? personDiary.children.find((child) => child.id === pickedChildId)!
              .school
          : undefined;
    }
  }, [pickedSchoolSlug, pickedChildId, personDiary]);

  const pickedLessons = useMemo(() => {
    switch (personDiary.profileType) {
      case "student":
        return personDiary.lessons;
      case "teacher":
        return pickedSchoolSlug
          ? personDiary.schools.find(
              (school) => school.slug === pickedSchoolSlug,
            )!.lessons
          : [];
      case "parent":
        return pickedChildId
          ? personDiary.children.find((child) => child.id === pickedChildId)!
              .lessons
          : [];
    }
  }, [pickedSchoolSlug, pickedChildId, personDiary]);

  return (
    <DiaryProvider
      value={{
        lessons: pickedLessons,
        profileType: personDiary.profileType,
        schoolSlug: pickedSchool?.slug,
        childId: pickedChildId,
        timetable: pickedSchool?.timetable ?? [],
        holidays: pickedSchool?.holidays ?? [],
      }}
    >
      <CalendarProvider value={{ currentDay: date }}>
        <Calendar />
      </CalendarProvider>
    </DiaryProvider>
  );
}
