'use client'

import { LazyMotion, domAnimation } from "framer-motion"
import { NewsHero } from "./hero"
import { ComingSoon } from "../restricted/commingSoon"

//mui components
import Stack from "@mui/material/Stack"

export function NewsWrapper() {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      <NewsHero />
      <ComingSoon />
    </LazyMotion>
  </Stack>
}
