'use client'

import { ISocial } from "@/interfaces"
import { useCallback } from "react"
import { useTranslations } from "next-intl"
import { useSocialsEditor } from "@/hooks"
import { Panel } from "@/ui"

//mui components
import Button from "@mui/material/Button"
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
  socials: ISocial[]
  setSocials: (socials: ISocial[]) => void
}

export function Socials({socials, setSocials}: SocialsProps) {
  const {social, setSocial, updateSocial, deleteSocial, addSocial, isUnique} = useSocialsEditor(socials, setSocials)
  const t = useTranslations('profile')
  

  const getIcon = useCallback((type: ISocial['type']) => {
    switch (type) {
      case 'fb': return <FacebookIcon color='primary' />
      case 'ig': return <InstagramIcon color='primary' />
      default: return <QuestionMarkIcon color='primary' />
    }
  }, [])

  return <Panel gap={2}>
    <Typography variant='h6'>{t('pick_socials')}</Typography>
    <Stack gap={2}>
      {socials.map((s, i) => <Stack key={i} direction='row' gap={2} sx={{alignItems: 'center'}}>
        {getIcon(s.type)}
        <TextField value={s.link} error={s.type === 'un'} onChange={(e) => updateSocial(i, e.target.value)} sx={{flex: 1}} />
        <CloseIcon color='primary' onClick={() => deleteSocial(i)} />
      </Stack>)}
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        {getIcon(social.type)}
        <TextField
          value={social.link}
          error={social.type === 'un' && social.link != ''}
          onChange={(e) => setSocial(s => ({...s, link: e.target.value}))}
          sx={{flex: 1}}
        />
        <AddIcon color='primary' onClick={addSocial} />
        <Button variant='contained' disabled={social.type === 'un' || !isUnique} onClick={addSocial}>{t('add')}</Button>
      </Stack>
    </Stack>
  </Panel>
}