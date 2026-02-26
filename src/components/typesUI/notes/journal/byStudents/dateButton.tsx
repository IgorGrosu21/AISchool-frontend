import { dateToDay, dateToShortMonth } from "@/utils/dates";

//mui components
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface DateButtonProps {
  date: string
}

export function DateButton({date}: DateButtonProps) {
  return <Button variant='outlined' sx={{p: 1, width: {xs: 75, md: 50}, minWidth: 'unset'}}>
    <Stack gap={{xs: 1, md: 0}} sx={{flexDirection: {xs: 'row', md: 'column'}}}>
      <Typography sx={{textAlign: 'center'}}>{dateToDay(new Date(date))}</Typography>
      <Typography sx={{textAlign: 'center'}}>{dateToShortMonth(new Date(date))}</Typography>
    </Stack>
  </Button>
}