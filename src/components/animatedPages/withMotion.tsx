'use client'

import { domAnimation, LazyMotion } from "framer-motion"

//mui components
import Stack from "@mui/material/Stack"

export function WithMotion({children}: {children: React.ReactNode | React.ReactNode[]}) {
  return <Stack>
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  </Stack>
}