'use client'

import { IUserAccount } from "@/interfaces"
import { Panel } from "@/ui"
import { useTranslations } from "next-intl"
import { langs } from "@/i18n"

//mui components
import Typography from "@mui/material/Typography"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

interface LangPickerProps {
  account: IUserAccount
  setAccount: (account: IUserAccount) => void
}

export function LangPicker({account, setAccount}: LangPickerProps) {
  const t = useTranslations('account')
  return <Panel gap={2}>
    <Typography variant='h6'>{t('lang_picker')}</Typography>
    <ToggleButtonGroup
      color='primary'
      value={account.lang.toUpperCase()}
      exclusive
      onChange={(_, lang) => setAccount({...account, lang: lang})}
      sx={{flex: 1}}
    >
      {langs.map((lang, i) => <ToggleButton key={i} value={lang.code.toUpperCase()} sx={{flex: 1}}>
        <Typography>{lang.name}</Typography>
      </ToggleButton>)}
    </ToggleButtonGroup>
  </Panel>
}