'use client'

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { IUserRoutes } from "@/interfaces"

//mui components
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
//icons
import AutoStoriesIcon from "@mui/icons-material/AutoStories" 
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined"
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined"

interface QuickLinksProps {
  userRoutes?: IUserRoutes
}

export function QuickLinks({ userRoutes }: QuickLinksProps) {
  const tLinks = useTranslations('components.sidebar')

  const links = useMemo(() => {
    return userRoutes ? [
      {link: 'manuals', Icon: AutoStoriesOutlinedIcon, label: tLinks('manuals')},
      {link: userRoutes?.diaryLink, Icon: ClassOutlinedIcon, label: tLinks('diary')},
      {link: userRoutes?.journalLink, Icon: AutoStoriesIcon, label: tLinks('journal')},
    ] : []
  }, [userRoutes, tLinks])

  return links.map((link, i) => <Link key={i} href={`/core/${link.link}`}>
    <Button sx={{gap: 1}}>
      <link.Icon color='primary' sx={{display: {xs: 'none', xl: 'block'}}} />
      <Typography variant='h6'>{link.label}</Typography>
    </Button>
  </Link>)
}