"use server";

import { WithMotion } from "../withMotion";
import { ISubject } from "@/interfaces";
import { TestsProvider } from "@/providers";
import { getExams, getOlympiads } from "@/app/actions";
import { TestsHero } from "./hero";
import { TestsFilters } from "./filters";
import { TestsList } from "./list";

//mui components
import Stack from "@mui/material/Stack";

interface TestsWrapperProps {
  subjects: ISubject[];
  type: "exams" | "olympiads";
}

export async function TestsWrapper({ subjects, type }: TestsWrapperProps) {
  return (
    <WithMotion>
      <TestsProvider
        value={{ type, getTests: type === "exams" ? getExams : getOlympiads }}
      >
        <TestsHero type={type} />
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
            <TestsFilters subjects={subjects} type={type} />
            <TestsList type={type} />
          </Stack>
        </Stack>
      </TestsProvider>
    </WithMotion>
  );
}
