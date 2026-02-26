"use server";

import { WithMotion } from "../withMotion";
import { IExam, ISubject } from "@/interfaces";
import { ExamsProvider } from "@/providers";
import { ExamsHero } from "./hero";
import { ExamsFilters } from "./filters";
import { ExamsList } from "./list";

//mui components
import Stack from "@mui/material/Stack";

export async function ExamsWrapper({
  exams,
  subjects,
}: {
  exams: IExam[];
  subjects: ISubject[];
}) {
  return (
    <WithMotion>
      <ExamsProvider value={{ exams }}>
        <ExamsHero />
        <Stack
          gap={{ xs: 4, md: 8 }}
          sx={{
            flex: 1,
            px: { xs: 2, sm: 4, md: 8, lg: 16 },
            py: { xs: 4, md: 8 },
          }}
        >
          <Stack
            gap={{ xs: 4, md: 8 }}
            sx={{ flex: 1, height: "100%", width: "100%", minHeight: "70vh" }}
          >
            <ExamsFilters subjects={subjects} />
            <ExamsList />
          </Stack>
        </Stack>
      </ExamsProvider>
    </WithMotion>
  );
}
