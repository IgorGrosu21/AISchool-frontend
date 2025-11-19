'use client'

import { Panel } from "@/ui";
import { useTranslations } from "next-intl";
import { IDetailedUser } from "@/interfaces";

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
  user: IDetailedUser
  setUser: (user: IDetailedUser) => void
}

const types: Array<{type: IDetailedUser['type'], icon: typeof SvgIcon}> = [
  {type: 'student', icon: PersonIcon},
  {type: 'teacher', icon: SupervisorAccountIcon},
  {type: 'parent', icon: FamilyRestroomIcon},
]

export function TypePicker({user, setUser}: TypePickerProps) {
  const t = useTranslations('profile')

  return <Panel gap={2}>
    <Typography variant='h6'>{t('type_picker.title')}</Typography>
    <Typography>{t('type_picker.helper')}</Typography>
    <ToggleButtonGroup
      color='primary'
      value={user.type}
      exclusive
      onChange={(_, type) => setUser({...user, type: type as (typeof types)[number]['type']})}
      sx={{flex: 1}}
    >
      {types.map((type, i) => {
        const Icon = type.icon
        return <ToggleButton key={i} value={type.type} sx={{flex: 1, gap: 1}} disabled={user.id !== ''}>
          <Typography>{t('title')} {t(type.type + 's')}</Typography>
          <Icon />
        </ToggleButton>
      })}
    </ToggleButtonGroup>
  </Panel>
}