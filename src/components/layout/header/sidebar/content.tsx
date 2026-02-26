"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n";
import { useTranslations } from "next-intl";
import { AuthButton } from "@/components/auth";
import { ThemeImage } from "@/ui";
import { logoutThis, createUsersInMicroservices } from "@/app/actions";
import { usePermissions } from "@/hooks";
import { writePermissions } from "@/utils/permissions";

//mui components
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type Routes = Array<
  Array<{
    path: string;
    label?: string;
    icon: React.ReactNode;
  }>
>;

interface SideBarProps {
  routes: Routes;
  isLoggedIn: boolean;
}

export function SideBar({ routes, isLoggedIn }: SideBarProps) {
  const [opened, open] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("layout.header");
  const { permissions, setPermissions, deletePermissions } = usePermissions();
  const [isPending, startTransition] = useTransition();

  const toggleDrawer = useCallback(() => {
    open((opened) => !opened);
  }, []);

  useEffect(() => {
    open(false);
    if (isLoggedIn) {
      if (permissions) {
        if (permissions.isAutoCreated) {
          startTransition(async () => {
            await createUsersInMicroservices(permissions.profileType, true);
            setPermissions({ ...permissions, isAutoCreated: false });
            writePermissions({ ...permissions, isAutoCreated: false });
          });
        }
      } else if (
        permissions === null &&
        pathname.includes("/core") &&
        pathname !== "/core/settings"
      ) {
        router.push("/core/settings");
      }
    }
  }, [permissions, pathname, router, setPermissions, isLoggedIn]);

  const handleLogout = useCallback(() => {
    deletePermissions();
    startTransition(async () => {
      await logoutThis();
    });
  }, [deletePermissions]);

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        size="large"
        sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={opened}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          zIndex: 1300,
          "& .MuiBackdrop-root": {
            bgcolor: "transparent",
          },
        }}
      >
        <Stack
          sx={{
            height: "100vh",
            minWidth: { xs: "100vw", md: "25vw", lg: "17.5vw" },
            maxWidth: { xs: "100vw", md: "33vw", lg: "20vw" },
            width: { xs: "100vw", md: "auto" },
            bgcolor: "background.paper",
            transition: "0.5s",
          }}
        >
          <Stack
            direction="row"
            sx={{
              p: 2,
              justifyContent: "center",
              bgcolor: "primary.dark",
              position: "relative",
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "block", md: "none" },
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "primary.contrastText",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Link href="/">
              <ThemeImage
                srcDark="/images/logo-transparent-dark.png"
                srcLight="/images/logo-transparent-light.png"
                alt="logo"
                width={100}
                height={94}
              />
            </Link>
          </Stack>
          <Stack gap={2} sx={{ height: "100%", width: "100%" }}>
            <Link
              href={isLoggedIn ? "/core/settings" : "/auth"}
              style={{ width: "100%" }}
            >
              <Stack
                gap={2}
                direction="row"
                sx={{
                  p: 2,
                  bgcolor: "primary.main",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ThemeImage
                  srcDark={
                    permissions?.user.avatar ??
                    "/images/default-avatar-dark.png"
                  }
                  srcLight={
                    permissions?.user.avatar ??
                    "/images/default-avatar-light.png"
                  }
                  style={{ borderRadius: "50%" }}
                  alt="avatar"
                  width={100}
                  height={100}
                />
                <Stack sx={{ flex: 1 }}>
                  <Typography variant="h6" color="primary.contrastText">
                    {permissions?.user.name ?? t("guest")}
                  </Typography>
                  <Typography variant="h6" color="primary.contrastText">
                    {permissions?.user.surname}
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Stack gap={2} sx={{ px: 4 }}>
              {routes.map((group, i) => (
                <Stack key={i}>
                  {group.map((route, j) => {
                    const isCoreRoute = i < 2;
                    const href =
                      isLoggedIn && j !== 2
                        ? "/core/" + route.path
                        : "/" + route.path;
                    const isInactive = !isLoggedIn && isCoreRoute;

                    if (isInactive) {
                      return (
                        <Stack
                          key={j}
                          direction="row"
                          gap={1}
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            opacity: 0.5,
                            color: "text.disabled",
                          }}
                        >
                          {route.icon}
                          <Typography color="text.disabled">
                            {t(route.path || "home")}
                          </Typography>
                        </Stack>
                      );
                    }

                    return (
                      <Link key={j} href={href}>
                        <Stack
                          direction="row"
                          gap={1}
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            "&:hover": { bgcolor: "action.hover" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          {route.icon}
                          <Typography>{t(route.path || "home")}</Typography>
                        </Stack>
                      </Link>
                    );
                  })}
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            component="form"
            sx={{ px: 4, pb: 4, flex: 1, justifyContent: "flex-end" }}
          >
            <AuthButton
              type={isLoggedIn ? "logout" : "login"}
              onClick={handleLogout}
              disabled={isPending}
            />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
