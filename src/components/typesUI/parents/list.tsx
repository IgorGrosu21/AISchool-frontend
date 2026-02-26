'use client'

import { SmallProfile } from "@/components";
import { IParentName } from "@/interfaces";
import { useTranslations } from "next-intl";

//mui components
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Panel } from "@/ui";

interface ParentsProps<T extends IParentName> {
  readonly parents: ReadonlyArray<T>
}

export function Parents<T extends IParentName>({parents}: ParentsProps<T>) {
  const t = useTranslations('parents');

  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('list')}:</Typography>
    </Panel>
    <Grid2 container spacing={4} columns={4}>
      {parents.map((parent, i) => <Grid2 key={i} size={{xs: 4, md: 2, lg: 2, xl: 1}}>
        <Panel gap={2}>
          <SmallProfile user={parent.user} />
        </Panel>
      </Grid2>)}
    </Grid2>
  </Stack>
}