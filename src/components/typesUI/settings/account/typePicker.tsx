'use client'

import { Panel } from "@/ui";
import { useTranslations } from "next-intl";
import { IUserAccount } from "@/interfaces";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks";

//icons
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
//mui components
import Typography from "@mui/material/Typography"
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SvgIcon from "@mui/material/SvgIcon";

interface TypePickerProps {
  account: IUserAccount
  setAccount: (account: IUserAccount) => void
}

const profileTypes: Array<{value: IUserAccount['profileType'], icon: typeof SvgIcon}> = [
  {value: 'student', icon: PersonIcon},
  {value: 'teacher', icon: SupervisorAccountIcon},
  {value: 'parent', icon: FamilyRestroomIcon},
]

export function TypePicker({account, setAccount}: TypePickerProps) {
  const isMobile = useIsMobile()
  const t = useTranslations('account')

  const profileType = useMemo(() => account.profileType, [account.profileType])

  return <Panel gap={2}>
    <Typography variant='h6'>{t('type_picker.title')}</Typography>
    <Typography>{t('type_picker.helper')}</Typography>
    <ToggleButtonGroup
      color='primary'
      value={profileType}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      exclusive
      onChange={(_, type) => setAccount({...account, profileType: type as (typeof profileTypes)[number]['value']})}
      sx={{flex: 1}}
    >
      {profileTypes.map((profileType, i) => {
        const Icon = profileType.icon
        return <ToggleButton key={i} value={profileType.value} sx={{flex: 1, gap: 1}} disabled={account.id !== ''}>
          <Typography>{t(profileType.value)}</Typography>
          <Icon />
        </ToggleButton>
      })}
    </ToggleButtonGroup>
  </Panel>
}