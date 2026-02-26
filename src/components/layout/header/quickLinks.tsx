"use server";

import { getTranslations } from "next-intl/server";

//mui components
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
//icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

export async function QuickLinks({ loggedIn }: { loggedIn: boolean }) {
  const tLinks = await getTranslations("layout.header");

  const links = loggedIn
    ? [
        {
          link: "manuals",
          Icon: AutoStoriesOutlinedIcon,
          label: tLinks("manuals"),
        },
        { link: "diary", Icon: ClassOutlinedIcon, label: tLinks("diary") },
        { link: "journal", Icon: AutoStoriesIcon, label: tLinks("journal") },
      ]
    : [
        {
          link: "olympiads",
          Icon: EmojiEventsIcon,
          label: tLinks("olympiads"),
        },
        { link: "exams", Icon: EditNoteIcon, label: tLinks("exams") },
        { link: "schools", Icon: SchoolOutlinedIcon, label: tLinks("schools") },
      ];

  return (
    <Stack
      gap={{ md: 2, lg: 4 }}
      direction="row"
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: { xs: "none", md: "flex" },
      }}
    >
      {links.map((link, i) => (
        <Link key={i} href={loggedIn ? `/core/${link.link}` : `/${link.link}`}>
          <Button sx={{ gap: 1 }}>
            <link.Icon
              color="primary"
              sx={{ display: { xs: "none", xl: "block" } }}
            />
            <Typography variant="h6">{link.label}</Typography>
          </Button>
        </Link>
      ))}
    </Stack>
  );
}
