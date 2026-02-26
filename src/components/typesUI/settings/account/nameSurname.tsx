'use client'

import { IUserAccount } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Panel } from "@/ui";

//mui components
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface NameSurnameProps {
  account: IUserAccount,
  setAccount: (account: IUserAccount) => void
}

export function NameSurname({account, setAccount}: NameSurnameProps) {
  const t = useTranslations('account')

  return <Panel gap={2} sx={{justifyContent: 'space-between'}}>
    <Typography variant='h6'>{t('set_name_surname')}</Typography>
    <TextField
      value={account.name}
      label={t('name')}
      onChange={e => setAccount({...account, name: e.target.value})}
    />
    <TextField
      value={account.surname}
      label={t('surname')}
      onChange={e => setAccount({...account, surname: e.target.value})}
    />
  </Panel>
}