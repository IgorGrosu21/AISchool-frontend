'use client'

import { NameSurname } from "./nameSurname";
import { Socials } from "./socials";
import { CityPicker } from "./cityPicker";
import { TypePicker } from "./typePicker";
import { LangPicker } from "./langPicker";
import { useAccountEditorContext } from "@/providers";
import { Avatar } from "./avatar";

//mui components
import Stack from "@mui/material/Stack"

export function Account() {
  const { instance: account, setInstance: setAccount } = useAccountEditorContext()

  return <Stack gap={{ xs: 6, md: 8 }} sx={{my: 4}}>
    <Stack gap={2} direction={{xs: 'column-reverse', md: 'row'}} sx={{width: '100%'}}>
      <Avatar account={account} setAccount={setAccount} />
      <NameSurname account={account} setAccount={setAccount} />
    </Stack>
    <Socials socials={account.socials} setSocials={socials => setAccount({...account, socials})} />
    <CityPicker account={account} setAccount={setAccount} />
    <TypePicker account={account} setAccount={setAccount} />
    <LangPicker account={account} setAccount={setAccount} />
  </Stack>
}
