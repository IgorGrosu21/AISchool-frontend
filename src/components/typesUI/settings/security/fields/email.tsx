'use client'

import { useSecurityField } from "@/hooks";
import { EmailField as InnerEmailField } from "@/components/fields";
import { FieldContainer, FieldProps } from "./container";

export function EmailField({ value, error, onChange, submit }: FieldProps<string>) {
  const [emailValue, emailError, handleEmailChange] = useSecurityField('email', value, error, onChange)

  return <FieldContainer submit={submit}>
    <InnerEmailField
      value={emailValue}
      error={error ?? emailError}
      onChange={handleEmailChange}
      name='email'
    />
  </FieldContainer>
}