"use server";

import { WithMotion } from "../withMotion";
import { IOlympiad, ISubject } from "@/interfaces";
import { OlympiadsProvider } from "@/providers/olympiads";
import { OlympiadsHero } from "./hero";
import { OlympiadsFilters } from "./filters";
import { OlympiadsList } from "./list";

import Stack from "@mui/material/Stack";

export async function OlympiadsWrapper({
  olympiads,
  subjects,
}: {
  olympiads: IOlympiad[];
  subjects: ISubject[];
}) {
  return (
    <WithMotion>
      <OlympiadsProvider value={{ olympiads }}>
        <OlympiadsHero />
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
            <OlympiadsFilters subjects={subjects} />
            <OlympiadsList />
          </Stack>
        </Stack>
      </OlympiadsProvider>
    </WithMotion>
  );
}
