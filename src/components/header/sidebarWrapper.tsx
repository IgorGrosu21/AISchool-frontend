'use server'

import { getTranslations } from "next-intl/server";
import { SideBar } from "./sidebar";
import { IUserRoutes } from "@/interfaces";

//icons
import HomeOutlined from "@mui/icons-material/HomeOutlined"
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined"
import Group from "@mui/icons-material/Group"
import School from "@mui/icons-material/School"
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined"
import QuizOutlined from "@mui/icons-material/QuizOutlined"
import ClassOutlined from "@mui/icons-material/ClassOutlined"
import AutoStories from "@mui/icons-material/AutoStories"
import VideocamOutlined from "@mui/icons-material/VideocamOutlined"
import EmojiEvents from "@mui/icons-material/EmojiEvents"
import SchoolOutlined from "@mui/icons-material/SchoolOutlined"
import SellOutlined from "@mui/icons-material/SellOutlined"

export async function SideBarWrapper({ userRoutes }: { userRoutes: IUserRoutes }) {
  const t = await getTranslations('components.sidebar')

  const routes = [
    [
      {path: '', label: t('home'), icon: <HomeOutlined color='primary' />},
    ],
    [
      {path: 'manuals', icon: <AutoStoriesOutlined color='secondary' />},
      {path: 'tests', icon: <QuizOutlined color='secondary' />},
    ],
    [
      {path: 'webinars', icon: <VideocamOutlined color='tertiary' />},
      {path: 'olimpiads', icon: <EmojiEvents color='tertiary' />},
      {path: 'universities', icon: <SchoolOutlined color='tertiary' />},
      {path: 'subscriptions', icon: <SellOutlined color='tertiary' />},
    ],
  ]

  if (userRoutes.profileLink) {
    routes[0].push({path: userRoutes.profileLink, label: t('profile'), icon: <AccountCircleOutlined color='primary' />})
  }
  if (userRoutes.klassLink) {
    routes[0].push({path: userRoutes.klassLink, label: t('klass'), icon: <Group color='primary' />})
  }
  if (userRoutes.schoolLink) {
    routes[0].push({path: userRoutes.schoolLink, label: t('school'), icon: <School color='primary' />})
  }
  if (userRoutes.diaryLink) {
    routes[1].push({path: userRoutes.diaryLink, label: t('diary'), icon: <ClassOutlined color='secondary' />})
  }
  if (userRoutes.journalLink) {
    routes[1].push({path: userRoutes.journalLink, label: t('journal'), icon: <AutoStories color='secondary' />})
  }

  return <SideBar user={userRoutes} routes={routes} />
}