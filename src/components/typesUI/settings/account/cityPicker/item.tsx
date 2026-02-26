'use client'

import { ICityName, ICountryName, IUserAccount, IRegionName } from '@/interfaces'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Select } from './select'
import { useCityPicker } from '@/hooks'
import { Panel } from '@/ui'

//mui components
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface CityPickerProps {
  account: IUserAccount
  setAccount: (account: IUserAccount) => void
}

export function CityPicker({account, setAccount}: CityPickerProps) {
  const t = useTranslations('account.city_picker')
  
  const {
    countries, regions, cities,
    country, region, city,
    updateCountry, updateRegion, updateCity,
  } = useCityPicker(account, setAccount) 

  return <Panel gap={2}>
    <Typography variant='h6'>{t('title')}</Typography>
    <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
      <Select<ICountryName>
        name='country'
        options={countries}
        value={country}
        setValue={updateCountry}
        renderOption={({key, ...props}, option) => {
          return <Box
            component='li'
            key={key}
            sx={{ 
              '& > img': { mr: 2, flexShrink: 0 },
              display: 'flex',
              alignItems: 'center'
            }}
            {...props}
          >
            <Image loading='lazy' width={40} height={20} src={option.flag} alt='' />
            {option.name}
          </Box>
        }}
      />
      <Select<IRegionName>
        disabled={!country}
        name='region'
        options={regions}
        value={region}
        setValue={updateRegion}
      />
      <Select<ICityName>
        disabled={!region}
        name='city'
        options={cities}
        value={city}
        setValue={updateCity}
      />
    </Stack>
  </Panel>
}