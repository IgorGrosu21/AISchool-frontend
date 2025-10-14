'use client'

import { useMemo } from 'react'
import { IDetailedKlass } from '@/interfaces'
import { KlassGroupsEditor, KlassLessonsEditor, StudentsEditor } from '@/components'
import { Panel } from '@/ui'
import { useTranslations } from 'next-intl'
import { useKlassEditorContext } from '@/providers'

//mui components
import Autocomplete from "@mui/material/Autocomplete"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

export function Editor() {
  const { instance: klass, setInstance: setKlass } = useKlassEditorContext()
  const profiles = useMemo(() => ['R', 'U'], [])
  const t = useTranslations('klasses');
  const allTeachers = useMemo(() => klass.school.staff.filter(s => s.subjects.length > 0).map(s => s.teacher), [klass.school.staff])

  return <>
    <Stack gap={4}>
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
      <Panel>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={klass.teacher}
          onChange={(_, t) => t ? setKlass({...klass, teacher: {...t, user: {...t.user, isVerified: false}}}) : {}}
          options={allTeachers}
          getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
          renderInput={(params) => <TextField {...params} label={t('teacher')} />}
        />
      </Panel>
    </Stack>
    <StudentsEditor students={klass.students} setStudents={students => setKlass(k => ({...k, students: students}))} />
    <KlassLessonsEditor staff={klass.school.staff} timetable={klass.school.timetable} klass={klass} setKlass={setKlass} />
    <KlassGroupsEditor staff={klass.school.staff} klass={klass} setKlass={setKlass} />
  </>
}