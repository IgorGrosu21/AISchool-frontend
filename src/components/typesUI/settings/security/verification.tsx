'use client'

import { useTranslations } from "next-intl";
import { Panel } from "@/ui";
import { CodeField } from "@/components/fields";

//mui components
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";

interface VerificationProps {
  value: string | null
  error: string
  onChange: (value: string | null, error: string) => void
  submit: () => void
  resend: () => void
  cancel: () => void
}

export function Verification({ value, error, onChange, submit, resend, cancel }: VerificationProps) {
  const t = useTranslations('auth')

  return <Backdrop open={value !== null} sx={{zIndex: 1500}}>
    <Panel gap={2} sx={{p: 4, width: '100%', maxWidth: '500px'}}>
      <CodeField
        value={value ?? ''}
        error={error}
        onChange={(value, error) => onChange(value, error)}
        submit={submit}
        resend={resend}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={cancel}
        sx={{borderRadius: 90, p: 1}}
      >
        <Typography variant='h6'>{t('cancel')}</Typography>
      </Button>
    </Panel>
  </Backdrop>
}