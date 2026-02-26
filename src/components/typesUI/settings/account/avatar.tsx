'use client'

import { IUserAccount } from "@/interfaces";
import { removeAvatar, editAvatar } from "@/app/actions";
import { Panel, ThemeImage } from "@/ui";
import { ImageUploader } from "../../../imageUploader";

//mui components
import Stack from "@mui/material/Stack"

interface AvatarEditorProps {
  account: IUserAccount
  setAccount: (account: IUserAccount) => void
}

export function Avatar({account, setAccount}: AvatarEditorProps) {
  return <Panel sx={{flexGrow: 0}}>
    <ImageUploader
      existing={account.avatar}
      setExisting={val => setAccount({...account, avatar: val})}
      sendFile={formData => editAvatar(formData, account)}
      deleteFile={() => removeAvatar(account)}
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
}