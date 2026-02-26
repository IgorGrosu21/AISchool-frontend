import { NavigationContainer, JournalWrapper } from "@/components";
import { fetchPersonJournal, handleResponse } from "@/requests";
import { getMonth, getYear } from "date-fns";
import { getTranslations } from "next-intl/server";

interface SearchParams {
  schoolSlug?: string;
  klassOrGroupSlug?: string;
  subjectSlug?: string;
  childId?: string;
  period?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const personJournal = await handleResponse(fetchPersonJournal());
  const t = await getTranslations("diary");

  let { schoolSlug, klassOrGroupSlug, subjectSlug, childId, period } =
    await searchParams;
  if (period === undefined) {
    const currentDate = new Date();
    const currentYear = getYear(currentDate);
    const currentMonth = getMonth(currentDate) + 1;

    if (currentMonth >= 9 && currentMonth <= 12) {
      period = `${currentYear}.09.01-${currentYear}.12.31`;
    } else {
      period = `${currentYear}.01.01-${currentYear}.05.31`;
    }
  }

  switch (personJournal.profileType) {
    case "teacher":
      if (personJournal.schools.length === 0) {
        break;
      }
      let school = personJournal.schools.find((s) => s.slug === schoolSlug);
      if (school === undefined || schoolSlug === undefined) {
        school = personJournal.schools[0];
        schoolSlug = school.slug;
      }

      if (school.klassesOrGroups.length === 0) {
        break;
      }
      let klass = school.klassesOrGroups.find(
        (k) => k.slug === klassOrGroupSlug,
      );
      if (klass === undefined || klassOrGroupSlug === undefined) {
        klass = school.klassesOrGroups[0];
        klassOrGroupSlug = klass.slug;
      }

      if (klass.subjects.length === 0) {
        break;
      }
      const subject = klass.subjects.find((s) => s.slug === subjectSlug);
      if (subject === undefined || subjectSlug === undefined) {
        subjectSlug = klass.subjects[0].slug;
      }

      break;
    case "parent":
      if (personJournal.children.length === 0) {
        break;
      }
      const child = personJournal.children.find(
        (child) => child.id === childId,
      );
      if (child === undefined || childId === undefined) {
        childId = personJournal.children[0].id;
      }
      break;
  }

  return (
    <NavigationContainer last={t("singular")}>
      <JournalWrapper
        schoolSlug={schoolSlug}
        klassOrGroupSlug={klassOrGroupSlug}
        subjectSlug={subjectSlug}
        childId={childId}
        period={period}
        personJournal={personJournal}
      />
    </NavigationContainer>
  );
}
