'use client'

import { useSecurityField } from "@/hooks";
import { EmailField as InnerEmailField } from "@/components/fields";
import { FieldContainer, FieldProps } from "./container";

export function BackupEmailField({ value, error, onChange, submit }: FieldProps<string | null>) {
  const [backupEmailValue, backupEmailError, handleBackupEmailChange] = useSecurityField('backupEmail', value, error, onChange)

  return <FieldContainer submit={submit}>
    <InnerEmailField
      value={backupEmailValue ?? ''}
      error={error ?? backupEmailError}
      onChange={handleBackupEmailChange}
      name='backup_email'
    />
  </FieldContainer>
}