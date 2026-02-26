"use server";

import { OlympiadsWrapper } from "@/components";
import { handleResponse, fetchOlympiads, fetchSubjects } from "@/requests";

export default async function Page() {
  const [olympiads, subjects] = await Promise.all([
    handleResponse(fetchOlympiads()),
    handleResponse(fetchSubjects()),
  ]);

  return <OlympiadsWrapper olympiads={olympiads} subjects={subjects} />;
}
