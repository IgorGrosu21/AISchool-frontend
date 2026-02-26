'use client'

import { useCallback } from "react"
import { useTranslations } from "next-intl"
import { useSocialsEditor } from "@/hooks"
import { Panel } from "@/ui"

//mui components
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
//icons
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"

interface SocialsProps {
  socials: string[]
  setSocials: (socials: string[]) => void
}

export function Socials({socials, setSocials}: SocialsProps) {
  const {
    verboseSocials,
    updateSocial, deleteSocial, addSocial,
  } = useSocialsEditor(socials, setSocials)
  const t = useTranslations('account.socials_picker')
  

  const getIcon = useCallback((type: 'fb' | 'ig' | 'un') => {
    switch (type) {
      case 'fb': return <FacebookIcon color='primary' />
      case 'ig': return <InstagramIcon color='primary' />
      default: return <QuestionMarkIcon color='primary' />
    }
  }, [])

  return <Panel gap={2}>
    <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography variant='h6'>{t('title')}</Typography>
      <AddIcon onClick={addSocial} color='primary' sx={{cursor: 'pointer'}} />
    </Stack>
    <Stack gap={2}>
      {verboseSocials.map((s, i) => <Stack key={i} direction='row' gap={2} sx={{alignItems: 'center'}}>
        {getIcon(s.type as 'fb' | 'ig' | 'un')}
        <TextField
          value={s.link}
          error={s.type === 'un' && s.link !== ''}
          label={s.type === 'un' && s.link !== '' ? t('unknown_type') : ''}
          onChange={(e) => updateSocial(i, e.target.value)}
          sx={{flex: 1}}
        />
        <CloseIcon color='primary' onClick={() => deleteSocial(i)} sx={{cursor: 'pointer'}} />
      </Stack>)}
    </Stack>
  </Panel>
}