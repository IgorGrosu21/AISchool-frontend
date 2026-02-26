'use client'

import { ISubject } from '@/interfaces';
import { Panel } from '@/ui';
import { SubjectsWithoutPanel } from './withoutPanel';

//mui components
import Stack, { type StackProps } from "@mui/material/Stack"

interface SubjectsProps extends StackProps {
  readonly subjects: ReadonlyArray<ISubject>,
  small?: boolean
  showText?: boolean
  hrefTemplate?: string
  applyPanel?: boolean
}

export function Subjects({subjects, small = false, showText = true, hrefTemplate, applyPanel = true, ...props}: SubjectsProps) {
  if (applyPanel) {
    return <Panel {...props} gap={small ? 2 : 4}>
      <SubjectsWithoutPanel subjects={subjects} small={small} showText={showText} hrefTemplate={hrefTemplate} />
    </Panel>
  }

  return <Stack {...props} gap={small ? 2 : 4}>
    <SubjectsWithoutPanel subjects={subjects} small={small} showText={showText} hrefTemplate={hrefTemplate} />
  </Stack>
}