'use server'

import { AnimatedErrorContent } from "./AnimatedErrorContent"

interface ErrorPageProps {
  code: number
}

export async function ErrorPage({code}: ErrorPageProps) {
  return <AnimatedErrorContent code={code} />
}