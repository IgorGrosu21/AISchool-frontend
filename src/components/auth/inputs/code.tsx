'use client'

import { useTranslations } from "next-intl";
import { ChangeEvent, KeyboardEvent, useCallback, useState, useEffect } from 'react'

//mui components
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

type CodeProps = {
  error: boolean;
  value: string;
  onChange: (value: string, error: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  helperText?: string;
}

const CODE_LENGTH = 6

export function Code({error, value, onChange, onKeyDown, helperText = ''}: CodeProps) {
  const t = useTranslations('auth');
  const [localHelperText, setLocalHelperText] = useState<string>(helperText);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const sanitized = rawValue.replace(/[^0-9a-zA-Z]/gi, '').toUpperCase().slice(0, CODE_LENGTH)

    let error = ''
    if (sanitized.length < CODE_LENGTH && sanitized.length > 0) {
      error = 'code_too_short'
    }

    onChange(sanitized, error)
  }, [onChange])

  //to remove dissapearing of text before collapse finishes
  useEffect(() => {
    if (helperText !== '') {
      setLocalHelperText(helperText);
    }
  }, [helperText]);

  return <Stack direction='column' gap={1}>
    <TextField
      autoFocus
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      label={t('fields.code')}
      placeholder='••••••'
      name='code'
      fullWidth
      error={error}
      sx={{
        mx: 'auto',
        '& .MuiInputBase-root': {
          borderRadius: 4,
          py: 2
        },
        '& .MuiInputBase-input': {
          textAlign: 'center',
          letterSpacing: '0.75rem',
          fontSize: '1.75rem',
          fontWeight: 600,
        },
        '& .MuiInputBase-input::placeholder': {
          opacity: 0.4
        }
      }}
    />
    <Collapse in={helperText !== ''}>
      <Typography color='error' sx={{ textAlign: 'center', mt: 1 }}>
        {localHelperText === '' ? '' : t(`errors.${localHelperText}`)}
      </Typography>
    </Collapse>
  </Stack>
}