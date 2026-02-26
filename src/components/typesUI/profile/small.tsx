'use client'

import { Link } from '@/i18n';
import { IUser, IUserName } from "@/interfaces";
import { ThemeImage } from "@/ui";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useMemo } from 'react';

interface SmallProfileProps<T extends IUserName> {
  user: T | null
  disableLink?: boolean
  extraSmall?: boolean
}

export function SmallProfile<T extends IUserName>({user, disableLink = false, extraSmall = false}: SmallProfileProps<T>) {
  const avatar = useMemo(() => {
    if (user && 'avatar' in user) {
      const userWithAvatar = user as IUser
      return userWithAvatar.avatar
    }
    return undefined
  }, [user])
  
  const content = <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
    {avatar !== undefined && <ThemeImage
      srcDark={avatar ? avatar : '/images/default-avatar-dark.png'}
      srcLight={avatar ? avatar : '/images/default-avatar-light.png'}
      alt='avatar'
      width={extraSmall ? 75 : 100}
      height={extraSmall ? 75 : 100}
      style={{borderRadius: '50%'}}
    />}
    <Stack sx={{alignItems: 'flex-start'}}>
      <Typography color='textPrimary' variant='h6'>{user?.name}</Typography>
      <Typography color='textPrimary' variant='h6'>{user?.surname}</Typography>
    </Stack>
  </Stack>

  if (disableLink || !user) {
    return content
  }

  return <Link href={`/core/profile?userId=${user.id}`} style={{display: 'flex', alignItems: 'center'}}>
    {content}
  </Link>
}