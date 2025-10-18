'use client'

import { Groups } from "../../groups"
import { useKlassContext } from "@/providers"

export function SchoolGroups() {
  const { klass } = useKlassContext()
  
  return <Groups klass={klass} />
}