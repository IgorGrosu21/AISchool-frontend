'use client';

import { useState } from 'react';
import { useRouter, usePathname, langs } from '@/i18n';
import { useLocale } from 'next-intl';

//mui components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
//icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import CheckIcon from "@mui/icons-material/Check"

export function LanguagePicker() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    handleClose();
  };

  const currentLanguage = langs.find(lang => lang.code === locale);

  return <Box>
    <Button
      variant='outlined'
      onClick={handleClick}
      endIcon={<KeyboardArrowDownIcon sx={{transform: `rotate(${open ? 180 : 0}deg)`, transition: '0.5s'}} />}
      sx={{ 
        px: 2,
        py: 1,
      }}
      aria-label="language picker"
    >
      <Typography sx={{display: {xs: 'none', lg: 'block'}}}>{currentLanguage?.name}</Typography>
      <Typography sx={{display: {xs: 'block', lg: 'none'}}}>{currentLanguage?.code}</Typography>
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {langs.map((language) => (
        <MenuItem
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          selected={language.code === locale}
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
            transition: '0.5s',
            cursor: 'pointer',
          }}
        >
          <ListItemText primary={language.name} sx={{display: {xs: 'none', lg: 'block'}}} />
          <ListItemText primary={language.code} sx={{display: {xs: 'block', lg: 'none'}}} />
          {language.code === locale && <CheckIcon sx={{ ml: 2, color: 'primary.main' }} />}
        </MenuItem>
      ))}
    </Menu>
  </Box>
}
