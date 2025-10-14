'use client'

import { useTranslations } from "next-intl";

//mui components
import { type AutocompleteRenderInputParams } from "@mui/material/Autocomplete"
import TextField, { type TextFieldProps } from "@mui/material/TextField"

export function Input({hidden = false, ...props}: (TextFieldProps | AutocompleteRenderInputParams) & { name?: string, hidden?: boolean }) {
  const t = useTranslations('auth');
  
  return <TextField {...props} sx={{
    ...(hidden ? {display: 'none'}: {}),
    '& .MuiInputBase-root': {
      borderRadius: 90,
      minHeight: {xs: '56px', md: 'auto'},
      fontSize: {xs: '1rem', md: 'inherit'}
    },
    '& .MuiInputLabel-root': {
      fontSize: {xs: '1rem', md: 'inherit'}
    },
    '& .MuiFormHelperText-root': {
      fontSize: {xs: '0.875rem', md: 'inherit'}
    }
  }} placeholder={hidden ? '' : t(props.name ?? '')} id={props.name} required={!hidden} />
}