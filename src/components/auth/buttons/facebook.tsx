'use client'

import Link from "next/link"
import { SocialButton } from "./socialButton"

export function FacebookButton() {
  return <Link href="/api/auth/facebook" style={{width: '100%'}}>
    <SocialButton type='facebook' />
  </Link>
}