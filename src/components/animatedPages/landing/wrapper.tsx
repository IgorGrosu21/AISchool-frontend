"use server";

import { LandingHero } from "./hero";
import { WithMotion } from "../withMotion";
import { DigitalLearning } from "./digitalLearning";
import { ExamsAndOlympiads } from "./examsAndOlympiads";
import { ConnectingToPlatform } from "./connectingToPlatform";

export async function LandingWrapper() {
  return (
    <WithMotion>
      <LandingHero />
      <DigitalLearning />
      <ExamsAndOlympiads />
      <ConnectingToPlatform />
    </WithMotion>
  );
}
