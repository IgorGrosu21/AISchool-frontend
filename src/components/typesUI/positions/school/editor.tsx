'use client'

import { ISchoolWithTimetable } from "@/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useTranslations } from "next-intl";
import { SmallProfile } from "@/components";
import { Panel } from "@/ui";

//mui components
import Checkbox from "@mui/material/Checkbox"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import CloseIcon from "@mui/icons-material/Close"

interface SchoolPositionsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function SchoolPositionsEditor({school, setSchool}: SchoolPositionsEditorProps) {
  const t = useTranslations('positions');

  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    <Grid2 container spacing={4} columns={2}>
      {school.staff.map((position, i) => <Grid2 key={i} size={{xs: 2, md: 1}}>
        <Panel sx={{height: '100%', justifyContent: 'center', position: 'relative'}}>
          <SmallProfile user={position.teacher.user} />
          <Stack direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={position.isManager} onChange={() => setSchool(
              s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, isManager: !p.isManager} : p)})
            )} />
          </Stack>
          <CloseIcon
            color='primary'
            sx={{cursor: 'pointer', position: 'absolute', top: 10, right: 10}}
            onClick={() => setSchool(s => ({...s, staff: s.staff.filter(p => p.id !== position.id)}))}
          />
        </Panel>
      </Grid2>)}
    </Grid2>
  </Stack>
}