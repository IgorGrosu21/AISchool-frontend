'use client'

import { AuthFields, CityPicker, Credentials } from "../(util)";
import { useTranslations } from "next-intl";
import { FormState } from "@/app/actions/auth";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks";

//mui components
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export function Signup({state}: {state: FormState}) {
  const t = useTranslations('auth');
  const userTypes = useMemo(() => ['student', 'teacher', 'parent'], [])
  const isMobile = useIsMobile();
  
  return <Stack gap={4} sx={{flex: 1, width: '100%'}}>
    <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{flex: 1}}>
      <Stack gap={2} sx={{flex: 1}}>
        <AuthFields state={state} />
        <Stack direction='column' sx={{flex: 1}}>
          <Typography>
            {t(`user_type.singular`)}:
          </Typography>
          <RadioGroup row={!isMobile} aria-labelledby='user-type-label' id='userType' name='userType'>
            {userTypes.map((type, i) => (
              <FormControlLabel 
                key={i} 
                value={type} 
                control={<Radio />} 
                label={t(`user_type.${type}`)}
                sx={{margin: {xs: '4px 0', md: '0 8px 0 0'}}}
              />
            ))}
          </RadioGroup>
        </Stack>
      </Stack>
      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
      <Credentials />
    </Stack>
    <Divider />
    <CityPicker />
  </Stack>
}