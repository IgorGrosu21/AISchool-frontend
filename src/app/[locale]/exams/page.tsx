"use server";

import { TestsWrapper } from "@/components";
import { handleResponse, fetchSubjects } from "@/requests";

export default async function Page() {
  const subjects = await handleResponse(fetchSubjects());

  return <TestsWrapper subjects={subjects} type="exams" />;
}
