'use client'

import { useTranslations } from 'next-intl'
import { Panel } from '@/ui'
import { Link } from '@/i18n'

//mui components
import Button from "@mui/material/Button"
import { usePermissions } from '@/hooks'
import { grantPermission } from '@/utils/permissions'

interface QuickButtonsProps {
  accountId: string
}

export function QuickButtons({accountId}: QuickButtonsProps) {
  const t = useTranslations('profile')

  const { permissions, refresh } = usePermissions()
  const permissionGranted = grantPermission(permissions, { type: 'account', accountId })
  if (!permissionGranted) {
    return null
  }

  return <Panel gap={2}>
    <Link href='/core/settings' style={{flex: 1}}>
      <Button variant='contained' color='primary' sx={{width: '100%'}}>{t('goto_settings')}</Button>
    </Link>
    <Button variant='contained' color='secondary' onClick={refresh}>{t('refresh_permissions')}</Button>
    <Button variant='contained' color='secondary'>{t('refresh_manuals')}</Button>
  </Panel>
}