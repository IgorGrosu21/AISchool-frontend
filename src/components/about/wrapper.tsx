'use client'

import { LazyMotion, domAnimation } from "framer-motion"
import { AboutHero } from "./hero"
import { AboutUs } from "./us"
import { AboutMotives } from "./motives"
import { AboutGoals } from "./goals"

//mui components
import Stack from "@mui/material/Stack"

export function AboutWrapper() {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <AboutHero />
      <AboutUs />
      <AboutMotives />
      <AboutGoals />
    </LazyMotion>
  </Stack>
}
