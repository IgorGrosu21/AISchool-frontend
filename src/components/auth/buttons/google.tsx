'use client'

import Link from "next/link"
import { SocialButton } from "./socialButton"

export function GoogleButton() {
  return <Link href="/api/auth/google" style={{width: '100%'}}>
    <SocialButton type='google' />
  </Link>
}