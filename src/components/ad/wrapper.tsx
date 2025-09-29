'use server'

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { AnimatedAdContent } from "./content";

export async function AdWrapper({children}: {children: ReactNode | ReactNode[]}) {
  const cookieStore = await cookies()
  const hasSubcription = cookieStore.get('subscription')?.value

  if (hasSubcription === '1') {
    return children
  }

  return <AnimatedAdContent />
}