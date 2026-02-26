'use client'

import { Panel } from '@/ui';
import { IDetailedSchool } from '@/interfaces';
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { KlassesRange } from '@/components';

//mui components
import Grid2 from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

interface AboutEditorProps {
  school: IDetailedSchool,
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function AboutEditor({school, setSchool}: AboutEditorProps) {
  const tDetails = useTranslations('schools.details');
  const tFilters = useTranslations('schools.filters');

  const country = useMemo(() => school.city.region.country, [school.city.region.country])

  const availableLangs = useMemo(() => country.langs.split(',').filter(l => l !== ''), [country.langs])
  const availableTypes = useMemo(() => country.schoolTypes.split(',').filter(t => t !== ''), [country.schoolTypes])
  const availableProfiles = useMemo(() => country.schoolProfiles.split(',').filter(p => p !== ''), [country.schoolProfiles])

  const currentProfiles = useMemo(() => school.profiles.split(',').filter(p => p !== ''), [school.profiles])

  const toggleValue = useCallback((arr: string[], value: string) => {
    if (arr.length === 0) {
      return [value]
    }
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
  }, [])

  const handleProfileChange = useCallback((value: string) => {
    const newProfiles = toggleValue(currentProfiles, value)
    setSchool(s => ({...s, profiles: newProfiles.join(',')}))
  }, [currentProfiles, toggleValue, setSchool])

  return <Grid2 container spacing={2} columns={2}>
    <Grid2 size={2}>
      <Panel>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{tDetails('about')}</Typography>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <KlassesRange
        startGrade={school.startGrade}
        finalGrade={school.finalGrade}
        setGrades={(startGrade, finalGrade) => setSchool(s => ({...s, startGrade, finalGrade}))}
      />
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel>
        <FormControl fullWidth>
          <InputLabel>{tDetails('lang')}</InputLabel>
          <Select
            value={school.lang}
            label={tDetails('lang')}
            onChange={(e) => setSchool(s => ({...s, lang: e.target.value}))}
          >
            {availableLangs.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel gap={2} sx={{height: '100%'}}>
        <Typography variant='h6'>{tFilters('types.title')}:</Typography>
        <Stack direction='row' gap={4} sx={{flexWrap: 'wrap'}}>
          {availableTypes.map((type) => (
            <Stack key={type} direction='row' sx={{alignItems: 'center'}} gap={2}>
              <Checkbox 
                checked={school.type === type} 
                onChange={() => setSchool(s => ({...s, type}))} 
                sx={{p: 0}} 
              />
              <Typography>{tFilters(`types.${type}`)}</Typography>
            </Stack>
          ))}
        </Stack>
      </Panel>
    </Grid2>
    <Grid2 size={{xs: 2, lg: 1}}>
      <Panel gap={2} sx={{height: '100%'}}>
        <Typography variant='h6'>{tFilters('profiles.title')}:</Typography>
        <Stack direction='row' gap={4} sx={{flexWrap: 'wrap'}}>
          {availableProfiles.map((profile) => (
            <Stack key={profile} direction='row' sx={{alignItems: 'center'}} gap={2}>
              <Checkbox 
                checked={currentProfiles.includes(profile)} 
                onChange={() => handleProfileChange(profile)} 
                sx={{p: 0}} 
              />
              <Typography>{tFilters(`profiles.${profile}`)}</Typography>
            </Stack>
          ))}
        </Stack>
      </Panel>
    </Grid2>
  </Grid2>
}