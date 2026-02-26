'use client'

import { useMemo } from 'react'
import { IDetailedKlass } from '@/interfaces'
import { GroupsStudentsSwapper, Parents, Stepper, StudentsEditor } from '@/components'
import { Panel } from '@/ui'
import { useTranslations } from 'next-intl'
import { useKlassEditorContext } from '@/providers'

//mui components
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export function Editor() {
  const { instance: klass, setInstance: setKlass } = useKlassEditorContext()
  const profiles = useMemo(() => ['R', 'U'], [])
  const t = useTranslations('klasses');

  return <Stack gap={4}>
    <Panel direction='row' gap={2} sx={{alignItems: 'center'}}>
      <Typography variant='h6'>{t(`profiles.title`)}:</Typography>
      <FormControl>
        <RadioGroup row value={klass.profile} onChange={e => setKlass({...klass, profile: e.target.value as IDetailedKlass['profile']})}>
          {profiles.map((profile, j) => 
            <FormControlLabel key={j} value={profile} control={<Radio />} label={t(`profiles.${profile}`)} />
          )}
        </RadioGroup>
      </FormControl>
    </Panel>
    <Stepper
      components={[
        {label: 'groups', component: <GroupsStudentsSwapper
          key={0}
          klass={klass}
          setKlass={setKlass}
        />},
        {label: 'students', component: <StudentsEditor
          key={1}
          klass={klass}
          setKlass={setKlass}
        />},
        {label: 'parents', component: <Parents
          key={2}
          parents={klass.parents}
        />}
      ]}
    />
  </Stack>
}