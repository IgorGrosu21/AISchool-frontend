import { createReadonlyViewset, type Args } from "../client"

const countryNamesViewset = createReadonlyViewset({ name: 'country-names', requiresAuth: false })
export async function fetchCountryNames() {
  return countryNamesViewset.fetch()
}

const regionNamesViewset = createReadonlyViewset({ name: 'region-names', requiresAuth: false })
export async function fetchRegionNames({ countrySlug }: Args<'region-names'>) {
  return regionNamesViewset.fetch({ kwargs: { countrySlug } })
}

const cityNamesViewset = createReadonlyViewset({ name: 'city-names', requiresAuth: false })
export async function fetchCityNames({ countrySlug, regionSlug }: Args<'city-names'>) {
  return cityNamesViewset.fetch({ kwargs: { countrySlug, regionSlug } })
}

const countryViewset = createReadonlyViewset({ name: 'country', requiresAuth: false })
export async function fetchCountry() {
  return countryViewset.fetch()
}