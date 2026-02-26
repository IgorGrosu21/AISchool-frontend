'use client'

import { useIsMobile, useSchoolFilters } from "@/hooks";

//mui components
import Stack from "@mui/material/Stack"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
//icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

type SchoolTablePaginatorProps = Pick<
  ReturnType<typeof useSchoolFilters>,
  'currentRows' | 'prevPage' | 'nextPage' | 'page'
> & {
  total: number
}

export function SchoolTablePaginator({currentRows, prevPage, nextPage, page, total}: SchoolTablePaginatorProps) {
  const isMobile = useIsMobile();

  return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell colSpan={isMobile ? 2 : 3} align="right" sx={{ py: 2, border: 0 }}>
      <Stack direction='row' gap={2} sx={{
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        flexWrap: 'nowrap'
      }}>
        <IconButton onClick={prevPage} disabled={page === 0} size="small" sx={{
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant='body1' sx={{textWrap: 'nowrap', minWidth: 'fit-content'}}>{currentRows}</Typography>
        <Typography variant='body1' color='text.secondary'>/</Typography>
        <Typography variant='body1' color='text.secondary'>{total}</Typography>
        <IconButton onClick={nextPage} disabled={page + 15 >= total} size="small" sx={{
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}>
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </TableCell>
  </TableRow>
}