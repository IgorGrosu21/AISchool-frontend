'use server'

import { redirect } from "next/navigation"
import { isLoggedIn } from "@/app/actions";
import { AuthWrapper } from "@/components";
import { AuthProvider } from "@/providers";

//mui components
import Stack from "@mui/material/Stack"

export default async function Page() {
  const loggedIn = await isLoggedIn()
  
  if (loggedIn) {
    redirect('/core')
  }

  return <Stack sx={{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh'
  }}>
    <AuthProvider value={undefined}>
      <AuthWrapper />
    </AuthProvider>
  </Stack>
}