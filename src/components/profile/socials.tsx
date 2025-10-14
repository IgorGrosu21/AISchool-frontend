'use server'

import { IDetailedUser, ISocial } from "@/interfaces";
import { Stack, Typography, Divider } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n';

//icons
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"

interface SocialsProps {
  user: IDetailedUser
}

export async function Socials({user}: SocialsProps) {
  let socials: Array<ISocial | null> = []
  user.socials.forEach(s => {
    socials.push(s)
    socials.push(null)
  })
  socials = socials.slice(0, -1)
  const t = await getTranslations('profile')

  return <Stack direction='row' gap={2}>
    <Typography variant='h6'>{t('socials')}:</Typography>
    <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
      {socials.map((s, i) => s ? <Link key={i} target='_blank' href={s.link}>
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