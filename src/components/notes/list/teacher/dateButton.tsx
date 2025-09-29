import { Button, Stack, Typography } from "@mui/material";
import { ru } from "date-fns/locale";
import { format } from 'date-fns';

interface DateButtonProps {
  date: string
}

export function DateButton({date}: DateButtonProps) {
  return <Button variant='outlined' sx={{p: 1, width: {xs: 75, md: 50}, minWidth: 'unset'}}>
    <Stack gap={{xs: 1, md: 0}} sx={{flexDirection: {xs: 'row', md: 'column'}}}>
      <Typography sx={{textAlign: 'center'}}>{format(new Date(date), 'd')}</Typography>
      <Typography sx={{textAlign: 'center'}}>{format(new Date(date), 'MMM', {locale: ru}).replace('.', '')}</Typography>
    </Stack>
  </Button>
}