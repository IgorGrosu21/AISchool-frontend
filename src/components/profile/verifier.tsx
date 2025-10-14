'use client'

import { IUser } from "@/interfaces"
import { useTranslations } from "next-intl"
import { SmallProfile } from "./smallProfile"

//mui components
import Checkbox from "@mui/material/Checkbox"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface UserVerifierProps {
  user: IUser,
  setUser: (user: IUser) => void
}

export function UserVerifier({user, setUser}: UserVerifierProps) {
  const t = useTranslations('profile')

  return <Stack direction='column' gap={2} sx={{height: '100%', alignItems: 'flex-start', justifyContent: 'center'}}>
    <SmallProfile user={user} disableLink />
    <Stack direction='row' sx={{alignItems: 'center'}}>
      <Typography variant='h6'>{t('is_verified')}</Typography>
      <Checkbox checked={user.isVerified} onChange={() => setUser({...user, isVerified: !user.isVerified})} />
    </Stack>
  </Stack>
}