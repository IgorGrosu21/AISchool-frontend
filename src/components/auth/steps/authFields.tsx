'use client'

import { useAuthContext } from '@/providers';
import { EmailField, PasswordField } from '../fields';
import { AuthButton } from '@/components';

export function AuthFields() {
  const { submit, activeType } = useAuthContext()
  
  return <>
    <EmailField />
    <PasswordField usePassword2={activeType !== 'login'} />
    <AuthButton type={activeType} onClick={submit} />
  </>
}