'use client'

import { useState, useCallback, useMemo } from 'react';
import { useValidatedFields } from '@/hooks';
import { Input } from '../inputs';
import { Password2 } from './password2';

//mui components
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
//icons
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Collapse from '@mui/material/Collapse';
import { useAuthContext } from '@/providers';

type PasswordFieldProps = {
  usePassword2?: boolean
}

export function PasswordField({usePassword2 = false}: PasswordFieldProps) {
  const { state, setState } = useAuthContext()
  const [masked, setMasked] = useState(true)
  const [localValue, localError, handleChange] = useValidatedFields('password')

  const error = useMemo(() => state.password.error ?? localError, [localError, state.password.error])

  const comparePasswords = useCallback((password2: string) => {
    if (password2 === localValue) {
      if (state.password.error === 'password_mismatch') {
        setState({...state, password: {...state.password, error: ''}})
      }
    } else {
      if (state.password.error === '') {
        setState({...state, password: {...state.password, error: 'password_mismatch'}})
      }
    }
  }, [localValue, setState, state])

  return <>
    <Input
      error={error !== ''}
      helperText={error}
      hasRedirectLabel={!usePassword2}
      type={masked ? 'password' : 'text'}
      name='password'
      value={localValue}
      onChange={e => handleChange(e.target.value)}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position='end' sx={{mr: 1}}>
            <IconButton 
              aria-label={masked ? 'hide' : 'display'} 
              onClick={() => setMasked(!masked)}  
              edge='end'
              sx={{
                minWidth: {xs: '48px', md: 'auto'},
                minHeight: {xs: '48px', md: 'auto'},
                '& .MuiSvgIcon-root': {
                  fontSize: {xs: '1.5rem', md: 'inherit'}
                }
              }}
            >
              {masked ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      }}
    />
    <Collapse in={usePassword2} timeout={2000}>
      <Password2 password={localValue} masked={masked} comparePasswords={comparePasswords} />
    </Collapse>
  </>
}