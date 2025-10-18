'use client'

import { ProviderProps, useMemo, useState } from "react"
import { IKlassNameWithGroups, ISchoolWithTimetable } from "@/interfaces";

import { KlassContext } from "./context";
import { PickKlass, KlassesButton } from "@/components";
import { useTranslations } from "next-intl";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

interface KlassProviderValue {
  school: ISchoolWithTimetable
  active: boolean
}

export function KlassProvider({children, value: {school, active}}: ProviderProps<KlassProviderValue>) {
  const [klass, setKlass] = useState<IKlassNameWithGroups>(school.klasses[0])
  const t = useTranslations('timetable')

  const pickedKlass = useMemo(() => school.klasses.find(k => klass.grade === k.grade && klass.letter === k.letter), [klass, school.klasses])

  return <Stack gap={8}>
    <Fade in={active}>
      <Box>
        <PickKlass klass={klass} setKlass={setKlass} />
      </Box>
    </Fade>
    <KlassContext.Provider value={{ klass: pickedKlass ?? klass }}>
      {pickedKlass ? <Fade 
        in={true} 
        key={pickedKlass.grade + pickedKlass.letter}
        timeout={300}
        style={{
          transitionDelay: '50ms',
        }}
      >
        <Box>
          {children}
        </Box>
      </Fade> : <Stack gap={2} sx={{alignItems: 'center'}}>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{t('lessons.klass_not_exist')}</Typography>
        <KlassesButton schoolSlug={school.slug} />
      </Stack>}
    </KlassContext.Provider>
  </Stack>
}