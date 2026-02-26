'use client'

import { KlassLink } from "@/components"
import { IKlassName } from "@/interfaces"
import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { useIsMobile } from "@/hooks"

//mui components
import Stack from "@mui/material/Stack"
import Grid2 from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"

interface KlassesProps {
  hrefTemplate: string
  type?: 'view' | 'edit'
  readonly klasses: ReadonlyArray<IKlassName>
}

export function Klasses({ hrefTemplate, type = undefined, klasses }: KlassesProps) {
  const t = useTranslations('klasses')
  const isMobile = useIsMobile()

  const grades = useMemo(() => {
    if (isMobile) {
      return Array.from({length: 12}, (_, i) => i + 1)
    }
    return Array.from({length: 6}, (_, i) => [i + 1, i + 7]).flat()
  }, [isMobile])

  const groups = useMemo(() => {
    const groups = grades.map((_, i) => ({ grade: i + 1, klasses: [] as IKlassName[] }))

    klasses.forEach(k => {
      const group = groups.find(s1 => s1.grade === k.grade)
      if (group) {
        group.klasses.push(k)
      }
    })

    return groups
  }, [grades, klasses])
  
  return <Stack>
    {type && <Typography variant='h5' sx={{textAlign: 'center', mb: 4}}>{t(`${type}_helper`)}</Typography>}
    <Grid2 container spacing={{xs: 4, md: 8}} columns={{xs: 4, md: 2}}>
      {grades.map(grade => <Grid2 size={1} key={grade}>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          gap={{xs: 2, md: 4}}
          sx={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}
        >
          {groups[grade - 1].klasses.map((klass, i) => <KlassLink
            key={i}
            hrefTemplate={hrefTemplate}
            klass={klass}
            big={!isMobile}
          />)}
        </Stack>
      </Grid2>)}
    </Grid2>
  </Stack>
}