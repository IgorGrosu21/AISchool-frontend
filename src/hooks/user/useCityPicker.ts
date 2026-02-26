'use client'

import { getCountryNames, getRegionNames, getCityNames } from '@/app/actions'
import { ICityName, ICountryName, IUserAccount, IRegionName } from '@/interfaces'
import { useCallback, useEffect, useState, useTransition } from 'react'

export function useCityPicker(user: IUserAccount, setUser: (user: IUserAccount) => void) {
  const [countries, setCountries] = useState<ICountryName[]>([])
  const [regions, setRegions] = useState<IRegionName[]>([])
  const [cities, setCities] = useState<ICityName[]>([])
  const [, startTransition] = useTransition()
  
  
  const [country, setCountry] = useState<ICountryName | null>(user.city.id ? user.city.region.country : null)
  const [region, setRegion] = useState<IRegionName | null>(user.city.id ? user.city.region : null)
  const [city, setCity] = useState<ICityName | null>(user.city.id ? user.city : null)

  const clearCity = useCallback(() => {
    setCity(null)
  }, [])

  const clearRegion = useCallback(() => {
    clearCity()
    setCities([])
    setRegion(null)
  }, [clearCity])

  const clearCountry = useCallback(() => {
    clearRegion()
    setRegions([])
    setCountry(null)
  }, [clearRegion])

  const updateCity = useCallback((newCity: ICityName | null, defaultRegion?: IRegionName | null, defaultCountry?: ICountryName | null) => {
    if (newCity === null) {
      return clearCity()
    }
    if (newCity.name === city?.name) return
    setCity(newCity)

    if (!defaultRegion && region) {
      defaultRegion = region
    }
    if (!defaultCountry && country) {
      defaultCountry = country
    }

    if (newCity && defaultRegion && defaultCountry) {
      setUser({...user, city: {...newCity, region: {...defaultRegion, country: defaultCountry}}})
    }
  }, [clearCity, country, region, city?.name, user, setUser])

  const updateRegion = useCallback((newRegion: IRegionName | null, defaultCountry?: ICountryName | null) => {
    if (newRegion === null) {
      return clearRegion()
    }
    if (newRegion.name === region?.name) return
    setRegion(newRegion)
    if (!defaultCountry && country) {
      defaultCountry = country
    }
    if (defaultCountry && newRegion) {
      startTransition(async () => {
        const cities = await getCityNames(defaultCountry.slug, newRegion.slug)
        setCities(cities)
        if (cities.length === 1) {
          updateCity(cities[0], newRegion, defaultCountry)
        }
      })
    }
  }, [clearRegion, country, region?.name, updateCity])

  const updateCountry = useCallback((newCountry: ICountryName | null) => {
    if (newCountry === null) {
      return clearCountry()
    }
    if (newCountry.name === country?.name) return
    setCountry(newCountry)

    if (newCountry) {
      startTransition(async () => {
        const regions = await getRegionNames(newCountry.slug)
        setRegions(regions)
        if (regions.length === 1) {
          updateRegion(regions[0], newCountry)
        }
      })
    }
  }, [clearCountry, country?.name, updateRegion])

  useEffect(() => {
    if (countries.length === 0) {
      startTransition(async () => {
        const countries = await getCountryNames()
        setCountries(countries)
        if (countries.length === 1) {
          updateCountry(countries[0])
        }
      })
    }
  }, [countries.length, updateCountry])

  return {
    countries, regions, cities,
    country, region, city,
    updateCountry, updateRegion, updateCity,
  }
}