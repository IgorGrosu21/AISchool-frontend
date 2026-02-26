"use client";

import { IPersonJournal } from "@/interfaces";
import { JournalProvider } from "@/providers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryParams } from "@/hooks";
import { NotesByStudents } from "./byStudents";
import { NotesBySubjects } from "./bySubjects";

interface JournalWrapperProps {
  schoolSlug?: string;
  klassOrGroupSlug?: string;
  subjectSlug?: string;
  childId?: string;
  period: string;
  personJournal: IPersonJournal;
}

export function JournalWrapper({
  schoolSlug,
  klassOrGroupSlug,
  subjectSlug,
  childId,
  period,
  personJournal,
}: JournalWrapperProps) {
  const [pickedSchoolSlug, setPickedSchoolSlug] = useState<string | undefined>(
    schoolSlug,
  );
  const [pickedKlassOrGroupSlug, setPickedKlassOrGroupSlug] = useState<
    string | undefined
  >(klassOrGroupSlug);
  const [pickedSubjectSlug, setPickedSubjectSlug] = useState<
    string | undefined
  >(subjectSlug);
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

  const updatePickedKlassOrGroupSlug = useCallback(
    (klassOrGroupSlug?: string) => {
      setPickedKlassOrGroupSlug(klassOrGroupSlug);
      updateQueryParam("klassOrGroupSlug", klassOrGroupSlug);
    },
    [updateQueryParam],
  );

  const updatePickedSubjectSlug = useCallback(
    (subjectSlug?: string) => {
      setPickedSubjectSlug(subjectSlug);
      updateQueryParam("subjectSlug", subjectSlug);
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
    if (klassOrGroupSlug) {
      updatePickedKlassOrGroupSlug(klassOrGroupSlug);
    }
  }, [klassOrGroupSlug, updatePickedKlassOrGroupSlug]);

  useEffect(() => {
    if (subjectSlug) {
      updatePickedSubjectSlug(subjectSlug);
    }
  }, [subjectSlug, updatePickedSubjectSlug]);

  useEffect(() => {
    if (childId) {
      updatePickedChildId(childId);
    }
  }, [childId, updatePickedChildId]);

  const pickedSchool = useMemo(() => {
    if (personJournal.profileType === "teacher") {
      return personJournal.schools.find(
        (school) => school.slug === pickedSchoolSlug,
      )!;
    }
    return undefined;
  }, [personJournal, pickedSchoolSlug]);

  const pickedKlassOrGroup = useMemo(() => {
    if (personJournal.profileType === "teacher" && pickedSchool) {
      return pickedSchool.klassesOrGroups.find(
        (klass) => klass.slug === pickedKlassOrGroupSlug,
      )!;
    }
    return undefined;
  }, [personJournal, pickedSchool, pickedKlassOrGroupSlug]);

  const personSubjects = useMemo(() => {
    switch (personJournal.profileType) {
      case "student":
        return personJournal.subjects;
      case "parent":
        return (
          personJournal.children.find((child) => child.id === pickedChildId)
            ?.subjects ?? undefined
        );
      case "teacher":
        return undefined;
    }
  }, [personJournal, pickedChildId]);

  const groups = useMemo(() => {
    if (personJournal.profileType === "teacher") {
      if (pickedKlassOrGroup === undefined) {
        return [];
      }
      return pickedKlassOrGroup.students.map((student) => ({
        id: student.id,
        name: `${student.user.surname} ${student.user.name}`,
        notes: [],
      }));
    }
    return personSubjects!.map((subject) => ({
      id: subject.slug,
      name: subject.name,
      notes: [],
    }));
  }, [personJournal, personSubjects, pickedKlassOrGroup]);

  useEffect(() => {
    setPickedSchoolSlug(schoolSlug);
  }, [schoolSlug]);

  useEffect(() => {
    setPickedKlassOrGroupSlug(klassOrGroupSlug);
  }, [klassOrGroupSlug]);

  useEffect(() => {
    setPickedSubjectSlug(subjectSlug);
  }, [subjectSlug]);

  useEffect(() => {
    setPickedChildId(childId);
  }, [childId]);

  return (
    <JournalProvider value={{ period, groups }}>
      {personJournal.profileType === "teacher" ? (
        <NotesByStudents
          school={pickedSchool!}
          klassOrGroup={pickedKlassOrGroup!}
          subjectSlug={pickedSubjectSlug!}
        />
      ) : (
        <NotesBySubjects
          childId={
            personJournal.profileType === "parent" ? pickedChildId : undefined
          }
          subjects={personSubjects!}
        />
      )}
    </JournalProvider>
  );
}
