"use server";

import { WithMotion } from "../withMotion";
import { ISubject } from "@/interfaces";
import { TestsProvider } from "@/providers";
import { getExams, getOlympiads } from "@/app/actions";
import { TestsHero } from "./hero";
import { TestsFilters } from "./filters";
import { TestsList } from "./list";
import { NavigationContainer } from "@/components";

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
        <NavigationContainer>
          <TestsFilters subjects={subjects} type={type} />
          <TestsList type={type} />
        </NavigationContainer>
      </TestsProvider>
    </WithMotion>
  );
}
