export type ICityName = {
  id: string
  readonly name: string
}

export type IRegionName = Readonly<{
  id: string
  name: string
  slug: string
}>

export type ICountryName = Readonly<{
  id: string
  name: string
  flag: string
  slug: string
}>