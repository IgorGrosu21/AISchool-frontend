'use client'

import { useTranslations } from "next-intl";
import { Panel } from "@/ui";

//mui components
import Button from "@mui/material/Button";

interface FieldContainerProps {
  children: React.ReactNode
  submit: () => void
}

export interface FieldProps<T = string> {
  value: T
  error: string
  onChange: (value: T, error: string) => void
  submit: () => void
}

export function FieldContainer({ children, submit }: FieldContainerProps) {
  const t = useTranslations('auth')

  return <Panel gap={2} direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
    {children}
    <Button variant='contained' color='primary' onClick={submit}>{t('save')}</Button>
  </Panel>
}