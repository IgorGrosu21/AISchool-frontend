'use server'

import { Content } from "./content";

export async function ComingSoon() {
  return <Content translations="coming_soon" />
}