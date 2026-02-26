'use client'

import { useSecurityField } from "@/hooks";
import { PasswordField as InnerPasswordField } from "@/components/fields";

import { FieldContainer, FieldProps } from "./container";

export function PasswordField({ value, error, onChange, submit }: FieldProps) {
  const [passwordValue, passwordError, handlePasswordChange] = useSecurityField('password', value, error, onChange)

  return <FieldContainer submit={submit}>
    <InnerPasswordField
      value={passwordValue}
      error={error ?? passwordError}
      onChange={handlePasswordChange}
    />
  </FieldContainer>
}