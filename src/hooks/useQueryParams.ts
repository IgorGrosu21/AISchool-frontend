import { useSearchParams } from "next/navigation"
import { useRouter, usePathname } from "@/i18n"
import { useCallback } from "react"

export function useQueryParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateQueryParam = useCallback((key: string, value: string | undefined) => {
    if (value) {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, value)
      router.replace(`${pathname}?${newSearchParams.toString()}`)
    }
  }, [searchParams, router, pathname])

  return updateQueryParam
}