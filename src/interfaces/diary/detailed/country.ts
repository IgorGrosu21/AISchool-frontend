import type { ICity, IRegion } from '../listed'
import type { ICountryName } from '../name'

export type IDetailedCity = ICity & Readonly<{
  region: IDetailedRegion
}>

export type IDetailedRegion = IRegion & Readonly<{
  country: IDetailedCountry
}>

export type IDetailedCountry = ICountryName & Readonly<{
  langs: string
  startGrade: number
  finalGrade: number
  schoolTypes: string
  schoolProfiles: string
}>