'use server'

import { fetchCountryNames, fetchRegionNames, fetchCityNames, handleResponse } from "@/requests";

export async function getCountryNames() {
  return handleResponse(fetchCountryNames())
}

export async function getRegionNames(countrySlug: string) {
  return handleResponse(fetchRegionNames({ countrySlug }))
}

export async function getCityNames(countrySlug: string, regionSlug: string) {
  return handleResponse(fetchCityNames({ countrySlug, regionSlug }))
}