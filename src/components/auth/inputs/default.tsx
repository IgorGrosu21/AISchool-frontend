'use client'

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

//mui components
import { type AutocompleteRenderInputParams } from "@mui/material/Autocomplete"
import TextField, { type TextFieldProps } from "@mui/material/TextField"
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { useAuthContext } from "@/providers";

type InputProps = (TextFieldProps | AutocompleteRenderInputParams) & {
  name: string;
  helperText?: string;
  hasRedirectLabel?: boolean
}

export function Input({name, helperText = '', hasRedirectLabel = false, ...props}: InputProps) {
  const t = useTranslations('auth');
  const [localHelperText, setLocalHelperText] = useState<string>(helperText);
  const { activeType, setActiveType } = useAuthContext();

  //to remove dissapearing of text before collapse finishes
  useEffect(() => {
    if (helperText !== '') {
      setLocalHelperText(helperText);
    }
  }, [helperText]);
  
  const switchType = useCallback(() => {
    if (activeType === 'login' || activeType === 'restore') {
      if (name === 'email') {
        return setActiveType('signup')
      }
      return setActiveType('restore')
    }
    setActiveType('login')
  }, [activeType, setActiveType, name]);

  return <Stack direction='column' gap={1}>
    <TextField
      {...props}
      id={name}
      required
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: 90,
          minHeight: {xs: '56px', md: 'auto'},
          fontSize: {xs: '1rem', md: 'inherit'},
          '& .MuiOutlinedInput-notchedOutline': {
            transition: 'all 0.3s ease-in-out'
          }
        },
        '& .MuiInputLabel-root': {
          fontSize: {xs: '1rem', md: 'inherit'}
        }
      }}
      placeholder={t(`fields.${name}`)}
    />
    {hasRedirectLabel && <Button
      variant='text'
      onClick={switchType}
      sx={{alignSelf: 'flex-start', p: 0}}
    >
      <Typography>{t(`${activeType}.redirect_labels.${name}`)}</Typography>
    </Button>}
    <Collapse in={helperText !== ''}>
      <Typography color='error'>{localHelperText === '' ? '' : t(`errors.${localHelperText}`)}</Typography>
    </Collapse>
  </Stack>
}