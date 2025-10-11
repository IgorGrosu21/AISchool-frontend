'use server'

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { Content } from "./content";

export async function Ad({children}: {children: ReactNode | ReactNode[]}) {
  const cookieStore = await cookies()
  const hasSubcription = cookieStore.get('subscription')?.value

  if (hasSubcription === '1') {
    return children
  }

  return <Content translations="ad" />
}