'use server'

import { Welcome, Pluses } from '@/components'

//mui components
import Stack from "@mui/material/Stack"

export default async function Page() {
  return <Stack>
    <Welcome type='hero' />
    <Pluses />
    <Welcome type='cta' />
  </Stack>
}