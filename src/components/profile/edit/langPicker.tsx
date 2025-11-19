'use client'

import { IDetailedUser } from "@/interfaces"
import { Panel } from "@/ui"
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useTranslations } from "next-intl"

interface LangPickerProps {
  user: IDetailedUser
  setUser: (user: IDetailedUser) => void
}

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'RO', name: 'Română' },
  { code: 'RU', name: 'Русский' }
]

export function LangPicker({user, setUser}: LangPickerProps) {
  const t = useTranslations('profile')
  return <Panel gap={2}>
    <Typography variant='h6'>{t('lang_picker')}</Typography>
    <ToggleButtonGroup
      color='primary'
      value={user.lang}
      exclusive
      onChange={(_, lang) => setUser({...user, lang: lang})}
      sx={{flex: 1}}
    >
      {languages.map((lang, i) => <ToggleButton key={i} value={lang.code} sx={{flex: 1}}>
        <Typography>{lang.name}</Typography>
      </ToggleButton>)}
    </ToggleButtonGroup>
  </Panel>
}