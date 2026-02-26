'use client'

import { Dispatch, ProviderProps, SetStateAction, useCallback, useState } from "react";
import { LinksContext } from "./context";
import { useTranslations } from "next-intl";

//mui components
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

interface ValueType<T> {
  setInstance: Dispatch<SetStateAction<T>>
}

export function AttachedLinksProvider<T extends {links: string[]}>({children, value: {setInstance}}: ProviderProps<ValueType<T>>) {
  const [newLink, setNewLink] = useState('')
  const [linksOpened, openLinks] = useState(false)
  const t = useTranslations('attached.links')

  const closeLinks = useCallback((addLink = false) => {
    if (newLink !== '' && addLink) {
      setInstance(instance => ({...instance, links: instance.links.length === 0 ? [newLink] : [...instance.links, newLink]}))
    }
    setNewLink('')
    openLinks(false)
  }, [newLink, setInstance])

  const editLink = useCallback((link: string, i: number) => {
    setInstance(instance => ({...instance, links: instance.links.map((l, j) => j === i ? link : l)}))
  }, [setInstance])
  
  const deleteLink = useCallback((i: number) => {
    setInstance(instance => ({...instance, links: instance.links.filter((_, j) => j !== i)}))
  }, [setInstance])

  return <LinksContext value={{
    openLinks: () => openLinks(true),
    editLink,
    deleteLink
  }}>
    {children}
    <Backdrop sx={{ zIndex: 1300 }} open={linksOpened}>
      <Stack gap={2} sx={{width: '60vw', bgcolor: 'background.default', p: 4}}>
        <TextField label={t('singular')} value={newLink} onChange={e => setNewLink(e.target.value)} />
        <Stack direction='row' gap={2}>
          <Button variant='outlined' onClick={() => closeLinks()}>{t('close')}</Button>
          <Box sx={{flex: 1}} />
          <Button variant='outlined' onClick={() => closeLinks()}>{t('discard')}</Button>
          <Button variant='contained' onClick={() => closeLinks(true)}>{t('add')}</Button>
        </Stack>
      </Stack>
    </Backdrop>
  </LinksContext>
}