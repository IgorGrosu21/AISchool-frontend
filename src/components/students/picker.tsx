'use client'

import { useCallback, useState } from "react";
import { SmallProfile } from "../profile";
import { IStudent } from "@/interfaces";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

interface StudentsPickerProps<T> {
  anchorEl: HTMLDivElement | null
  students: T[]
  activeStudent: T
  setActiveStudent: (student: T) => void
}

export function StudentsPicker<T extends IStudent | string>({anchorEl, students, activeStudent, setActiveStudent}: StudentsPickerProps<T>) {
  const [opened, open] = useState(false);

  const isSelected = useCallback((student: T) => {
    if (typeof activeStudent === 'string' && typeof student === 'string') {
      return activeStudent === student
    } else if (typeof activeStudent !== 'string' && typeof student !== 'string') {
      return activeStudent.id === student.id
    }
    return false
  }, [activeStudent])

  return <Box>
    <Button variant='text' onClick={() => open(true)} sx={{px: {xs: 0, md: 2}, py: {xs: 0, md: 1}, gap: {xs: 1, md: 2, lg: 4}}}>
      {typeof activeStudent === 'string' ? activeStudent : <SmallProfile user={activeStudent.user} disableLink extraSmall />}
      <KeyboardArrowDown sx={{transform: `rotate(${opened ? 180 : 0}deg)`, transition: '0.5s', fontSize: '2rem'}} />
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={opened}
      onClose={() => open(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left'}}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: anchorEl?.clientWidth,
        },
        '& .MuiPaper-root > ul': {
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
        },
      }}
    >
      {students.map((student, i) => (
        <MenuItem
          key={i}
          onClick={() => setActiveStudent(student)}
          selected={isSelected(student)}
          sx={{
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'primary.main',
              },
              transition: '0.5s',
            },
            '&:hover': {
              bgcolor: 'primary.main',
            },
            transition: '0.5s'
          }}
        >
          {typeof student === 'string' ? <Typography>
            {student}
            </Typography> : <SmallProfile user={student.user} disableLink extraSmall />}
        </MenuItem>
      ))}
    </Menu>
  </Box>
}
