'use client'

import { IDetailedUser } from "@/interfaces";
import { Fields } from "./fields";
import { Socials } from "./socials";
import { ImageUploader } from "../../imageUploader";
import { removeAvatar, editAvatar } from "@/app/actions";
import { Panel, ThemeImage } from "@/ui";
import { CityPicker } from "./cityPicker";
import { TypePicker } from "./typePicker";
import { LangPicker } from "./langPicker";

//mui components
import Stack from "@mui/material/Stack"

interface ContainerProps {
  user: IDetailedUser
  setUser: (user: IDetailedUser) => void
  children?: React.ReactNode | React.ReactNode[]
}

export function ProfileContainer({user, setUser, children}: ContainerProps) {
  return <>
    <Stack gap={4} direction={{ xs: 'column', md: 'row' }} sx={{alignItems: 'center'}}>
      <Panel sx={{flexGrow: 0, height: '100%', alignItems: 'center'}}>
        <ImageUploader
          existing={user.avatar}
          setExisting={val => setUser({...user, avatar: val})}
          sendFile={editAvatar}
          deleteFile={removeAvatar}
          renderImage={(src) => <Stack sx={{
            border: 1,
            borderColor: 'primary.main',
            borderRadius: '50%',
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: { xs: 'center', md: 'flex-start' }
          }}>
            <ThemeImage
              srcDark={src ? src : '/images/default-avatar-dark.png'}
              srcLight={src ? src : '/images/default-avatar-light.png'}
              alt='avatar'
              width={200}
              height={200}
              style={{
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} 
            />
          </Stack>}
        />
      </Panel>
      <Fields user={user} setUser={setUser} />
    </Stack>
    <Stack gap={{ xs: 6, md: 8 }}>
      <Socials socials={user.socials} setSocials={socials => setUser({...user, socials})} />
      {children ?? <>
        <CityPicker user={user} setUser={setUser} />
        <TypePicker user={user} setUser={setUser} />
        <LangPicker user={user} setUser={setUser} />
      </>}
    </Stack>
  </>
}
