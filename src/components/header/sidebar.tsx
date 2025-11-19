'use client'

import { useState, useEffect, useCallback } from "react"
import { Link, usePathname, useRouter } from "@/i18n"
import { useTranslations } from "next-intl"
import { AuthButton } from "@/components"
import { ThemeImage } from "@/ui"
import { logoutThis } from "@/app/actions"
import { IUserRoutes } from "@/interfaces"

//mui components
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

type Routes = Array<Array<{
  path: string,
  label?: string,
  icon: React.ReactNode
}>>

interface SideBarProps {
  user?: IUserRoutes
  routes: Routes
}

export function SideBar({ user, routes }: SideBarProps) {
  const [opened, open] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('components.sidebar')

  const toggleDrawer = useCallback(() => {
    open(opened => !opened)
  }, [])
  
  useEffect(() => {
    open(false)
    if (!user && pathname.includes('/core') && pathname !== '/core/profile/edit') {
      router.push('/core/profile/edit')
    }
  }, [pathname, router, user])

  return <>
    <IconButton onClick={toggleDrawer} size="large" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
      <MenuIcon />
    </IconButton>
    <Drawer
      variant="temporary"
      open={opened}
      onClose={toggleDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 1300,
        '& .MuiBackdrop-root': {
          bgcolor: 'transparent'
        }
      }}
    >
      <Stack sx={{
        height: '100vh',
        minWidth: {xs: '100vw', md: '25vw', lg: '17.5vw'},
        maxWidth: {xs: '100vw', md: '33vw', lg: '20vw'},
        width: {xs: '100vw', md: 'auto'},
        bgcolor: 'background.paper',
        transition: '0.5s'
      }}>
        <Stack direction='row' sx={{p: 2, justifyContent: 'center', bgcolor: 'primary.dark', position: 'relative'}}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              display: {xs: 'block', md: 'none'},
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'primary.contrastText'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Link href='/'>
            <ThemeImage
              srcDark='/images/logo-transparent-dark.png'
              srcLight='/images/logo-transparent-light.png'
              alt='logo'
              width={100}
              height={94}
            />
          </Link>
        </Stack>
        <Stack gap={2} sx={{height: '100%', width: '100%', justifyContent: 'center'}}>
          <Stack gap={2} direction='row' sx={{p: 2, bgcolor: 'primary.main', alignItems: 'center'}}>
            <Link href={`/core/${user?.profileLink ?? 'profile/edit'}`} style={{display: 'flex', alignItems: 'center'}}>
              <ThemeImage
                srcDark={user?.avatar ?? '/images/default-avatar-dark.png'}
                srcLight={user?.avatar ?? '/images/default-avatar-light.png'}
                style={{borderRadius: '50%'}}
                alt='avatar'
                width={100}
                height={100}
              />
            </Link>
            <Stack sx={{flex: 1}}>
              <Typography variant='h6' color='primary.contrastText'>{user?.name}</Typography>
              <Typography variant='h6' color='primary.contrastText'>{user?.surname}</Typography>
            </Stack>
          </Stack>
          <Stack gap={2} sx={{px: 4}}>
            {routes.map((group, i) => <Stack key={i}>
              {group.map((route, j) => (
                <Link key={j} href={'/core/' + route.path}>
                  <Stack direction='row' gap={1} sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    '&:hover': { bgcolor: 'action.hover' },
                    transition: 'background-color 0.2s'
                  }}>
                    {route.icon}
                    <Typography>{route.label ?? t(route.path)}</Typography>
                  </Stack>
                </Link>
              ))}
            </Stack>)}
          </Stack>
          <Stack component='form' action={logoutThis} sx={{px: 4, pb: 4, flex: 1, justifyContent: 'flex-end'}}>
            <AuthButton type='logout' onClick={logoutThis} />
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  </>
}