//mui components
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export function Loader({open}: {open: boolean}) {
  return <Backdrop sx={{ zIndex: 1500 }} open={open}>
    <CircularProgress size='30vh' />
  </Backdrop>
}