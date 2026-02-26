'use server'

import { WithMotion } from "../../withMotion"
import { AboutHero } from "./hero"
import { AboutUs } from "./us"
import { AboutMotives } from "./motives"
import { AboutGoals } from "./goals"

export async function AboutWrapper() {
  return <WithMotion>
    <AboutHero />
    <AboutUs />
    <AboutMotives />
    <AboutGoals />
  </WithMotion>
}
