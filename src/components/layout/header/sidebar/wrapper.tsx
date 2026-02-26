"use server";

import { SideBar } from "./content";
import { isLoggedIn } from "@/app/actions";

//icons
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";
import QuizOutlined from "@mui/icons-material/QuizOutlined";
import ClassOutlined from "@mui/icons-material/ClassOutlined";
import AutoStories from "@mui/icons-material/AutoStories";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SellOutlined from "@mui/icons-material/SellOutlined";

export async function SideBarWrapper() {
  const loggedIn = await isLoggedIn();

  const routes = [
    [
      { path: "", icon: <HomeOutlined color="primary" /> },
      { path: "settings", icon: <SettingsIcon color="primary" /> },
      { path: "profile", icon: <AccountCircleOutlined color="primary" /> },
      { path: "notifications", icon: <NotificationsIcon color="primary" /> },
    ],
    [
      { path: "manuals", icon: <AutoStoriesOutlined color="secondary" /> },
      { path: "tests", icon: <QuizOutlined color="secondary" /> },
      { path: "diary", icon: <ClassOutlined color="secondary" /> },
      { path: "journal", icon: <AutoStories color="secondary" /> },
    ],
    [
      { path: "exams", icon: <EditNoteIcon color="tertiary" /> },
      { path: "olympiads", icon: <EmojiEvents color="tertiary" /> },
      { path: "schools", icon: <SchoolOutlined color="tertiary" /> },
      { path: "subscriptions", icon: <SellOutlined color="tertiary" /> },
    ],
  ];

  return <SideBar routes={routes} isLoggedIn={loggedIn} />;
}
