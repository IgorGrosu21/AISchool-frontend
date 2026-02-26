'use client'

import { IUserAccount } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useVerboseSocials } from "@/hooks";

//mui components
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import { useMemo } from "react";

interface SocialsProps {
  user: IUserAccount
}

export function Socials({user}: SocialsProps) {
  const socialsLinksWithNulls = useMemo(() => {
    let socials: Array<string | null> = []
    user.socials.forEach(s => {
      socials.push(s)
      socials.push(null)
    })
    socials = socials.slice(0, -1)
    return socials
  }, [user.socials])
  const { socialsWithNulls } = useVerboseSocials(socialsLinksWithNulls)
  const t = useTranslations('profile')

  return <Stack direction='row' gap={2}>
    <Typography variant='h6'>{t('socials')}:</Typography>
    <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
      {socialsWithNulls.map((s, i) => s ? <Link key={i} target='_blank' href={s.link}>
        <Stack direction='row' gap={1} sx={{alignItems: 'center'}}>
        {
        s.type === 'fb'
        ?
        <>
          <FacebookIcon color='primary' />
          <Typography variant="h6" sx={{display: {xs: 'none', md: 'inline'}}}>Facebook</Typography>
        </>
        :
        <>
          <InstagramIcon color='primary' />
          <Typography variant="h6" sx={{display: {xs: 'none', md: 'inline'}}}>Instagram</Typography>
        </>
        }
        </Stack>
      </Link> : <Divider key={i} flexItem orientation='vertical' />)}
    </Stack>
  </Stack>
}