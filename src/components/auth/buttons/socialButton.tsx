'use client'

import { useTranslations } from "next-intl"
import { useMemo } from "react"

//mui components
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
//icons
import FacebookIcon from "@mui/icons-material/Facebook"
import { GoogleIcon } from "./googleIcon"

interface SocialButtonProps {
  type: 'facebook' | 'google'
  onClick?: () => void
}

export function SocialButton({type, onClick}: SocialButtonProps) {
  const t = useTranslations('auth.oauth2');
  const Icon = useMemo(() => type === 'google' ? GoogleIcon : FacebookIcon, [type]);

  return <Button onClick={onClick} type={onClick ? 'button' : 'submit'} variant="contained" sx={[{
    borderRadius: 90,
    py: 1,
    px: 2,
    width: '100%',
    backgroundColor: type === 'google' ? '#FFFFFF' : '#1877F2',
    color: type === 'google' ? '#3C4043' : '#FFFFFF',
  }, theme => theme.applyStyles('dark', {
    backgroundColor: type === 'google' ? '#1F1F1F' : '#1877F2',
    color: type === 'google' ? '#E8EAED' : '#FFFFFF',
  })]}>
    <Stack direction="row" gap={{xs: 1, md: 2}} alignItems="center" sx={{ width: '100%' }}>
      <Icon sx={{color: type === 'google' ? 'inherit' : '#FFFFFF', fontSize: {xs: 24, md: 32}}} />
      <Typography variant="h6" sx={{textAlign: 'left'}}>{t(`${type}`)}</Typography>
    </Stack>
  </Button>
}