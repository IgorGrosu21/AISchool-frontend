import type { ICityName, IRegionName, ICountryName } from '../name'

export type ICity = ICityName & Readonly<{
  region: IRegion
}>

export type IRegion = IRegionName & Readonly<{
  country: ICountryName
}>