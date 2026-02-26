"use server";

import { ExamsWrapper } from "@/components";
import { handleResponse, fetchExams, fetchSubjects } from "@/requests";

export default async function Page() {
  const [exams, subjects] = await Promise.all([
    handleResponse(fetchExams()),
    handleResponse(fetchSubjects()),
  ]);

  return <ExamsWrapper exams={exams} subjects={subjects} />;
}
