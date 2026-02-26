'use client'

import { ISubject } from "@/interfaces";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SubjectsWithoutPanel } from "./withoutPanel";

//mui components
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Stack, { type StackProps } from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
//icons
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"

interface SubjectsEditorProps extends StackProps {
  subjectSlugs: string[],
  setSubjects: (subjects: ISubject[]) => void
  allSubjects: ReadonlyArray<ISubject>,
  lang?: string
  small?: boolean
  type?: 'school' | 'position'
}

export function SubjectsEditor({subjectSlugs, setSubjects, allSubjects, lang, small = false, type, ...props}: SubjectsEditorProps) {
  const [applyLang, setApplyLang] = useState(true)
  const filteredSubjects = useMemo(() => {
    if (applyLang && lang) {
      const excludedLang = lang.toLowerCase() === 'ro' ? 'ru' : 'ro'
      return allSubjects.filter(subject => subject.lang !== excludedLang)
    }
    return allSubjects
  }, [allSubjects, lang, applyLang])
  const pickedSubjects = useMemo(() => {
    return allSubjects.filter(subject => subjectSlugs.includes(subject.slug))
  }, [subjectSlugs, allSubjects])
  const t = useTranslations('subjects')
  
  return <Stack gap={4}>
    {lang && <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography variant='h5'>{t('filter_by_lang', {lang})}</Typography>
      <Switch checked={applyLang} onChange={() => setApplyLang(!applyLang)} />
    </Stack>}
    {type && <Stack gap={2}>
      <Typography variant='h5'>{t(`pick.${type}`)}</Typography>
      <Typography>{t(`helper.${type}`)}</Typography>
    </Stack>}
    <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{alignItems: 'center'}}>
      <Autocomplete
        multiple
        options={filteredSubjects}
        value={pickedSubjects}
        isOptionEqualToValue={(option, value) => option.slug === value.slug}
        onChange={(_, newValue: ISubject[] | null) => setSubjects(newValue ?? [])}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        sx={{flex: {xs: 'unset', md: 1}, width: '100%'}}
        renderOption={({key, ...props}, option, { selected }) => {
          return <Box component='li' key={key} {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
              checkedIcon={<CheckBoxIcon fontSize='small' />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </Box>
        }}
        renderInput={(params) => (
          <TextField {...params} label={t('list')} placeholder={t('picked')} />
        )}
      />
      <Stack
        direction={{xs: 'row', md: 'column'}}
        gap={2}
        sx={{alignItems: 'center', justifyContent: 'space-between', width: {xs: '100%', md: 'unset'}}}
      >
        <Button variant='contained' onClick={() => setSubjects([...filteredSubjects])} sx={{width: '100%'}}>{t('select_all')}</Button>
        <Button variant='contained' onClick={() => setSubjects([])} sx={{width: '100%'}}>{t('deselect_all')}</Button>
      </Stack>
    </Stack>
    <Stack {...props} gap={small ? 2 : 4}>
      <SubjectsWithoutPanel subjects={pickedSubjects} small={small} {...props} />
    </Stack>
  </Stack>
}