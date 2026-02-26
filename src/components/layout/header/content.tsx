"use server";

import { isLoggedIn } from "@/app/actions";
import { Link } from "@/i18n";
import { SideBarWrapper } from "./sidebar";
import { LanguagePicker } from "./languagePicker";
import { ToTopButton } from "./toTopButton";
import { NightNodeToggler } from "./nightNodeToggler";
import { ThemeImage } from "@/ui";
import { QuickLinks } from "./quickLinks";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//icons
import CallIcon from "@mui/icons-material/Call";

export async function Header() {
  const loggedIn = await isLoggedIn();

  return (
    <Stack
      direction="row"
      component="header"
      sx={{
        position: "sticky",
        zIndex: 1300,
        top: 0,
        py: 2,
        px: { xs: 2, sm: 4, md: 8, lg: 16 },
        bgcolor: "background.paper",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        alignItems: "center",
      }}
    >
      <Stack
        gap={{ xs: 2, lg: 4 }}
        direction="row"
        sx={{
          flex: { xs: 0, lg: 1 },
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Link href={loggedIn ? "/core" : "/"}>
          <ThemeImage
            srcDark="/images/logo-hat-dark.png"
            srcLight="/images/logo-hat-light.png"
            alt="logo"
            width={98}
            height={70}
            priority
          />
        </Link>
        <Link href="tel:060578524">
          <Stack
            direction="row"
            gap={1}
            sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
          >
            <CallIcon color="primary" />
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontSize: { xs: "1.25rem", lg: "1.5rem" } }}
            >
              060 578 524
            </Typography>
          </Stack>
        </Link>
      </Stack>
      <QuickLinks loggedIn={loggedIn} />
      <Stack
        gap={{ xs: 2, lg: 4 }}
        direction="row"
        sx={{
          flex: { xs: 1, md: 0, lg: 1 },
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <NightNodeToggler />
        <LanguagePicker />
        <SideBarWrapper />
      </Stack>
      <ToTopButton />
    </Stack>
  );
}
