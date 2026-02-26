'use client'

import { Panel, Section, SectionHeader } from "@/ui";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";

const colors = ['#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']

export function AboutGoals() {
  const t = useTranslations('animated_pages.info.about.goals');

  return <Section id='section3' sx={{display: 'flex', alignItems: 'center'}}>
    <SectionHeader text1={t(`title`)} text2={t(`desc`)} />
    <Grid2 container spacing={2} sx={{width: '100%', maxWidth: 'lg', mx: 'auto', px: 4, zIndex: 2}}>
      {colors.map((color, index) => <Grid2 size={{xs: 12, md: 6}} key={`goals-${index}`}>
        <m.div
          key={`goals-${index}`}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          style={{height: '100%'}}
        >
          <Panel direction='column' gap={2} sx={{
            height: '100%',
            alignItems: 'center',
            position: 'relative',
            p: 4
          }}>
            <Stack sx={{
              width: {xs: 40, md: 80},
              height: {xs: 40, md: 80},
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 32px ${color}40`
            }}>
              <Typography variant="h5" sx={{ fontSize: {xs: 24, md: 40}, fontWeight: 700, color: 'background.default' }}>{index + 1}</Typography>
            </Stack>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
              fontSize: {xs: '1rem', md: '1.25rem'}
            }}>
              {t(`items.${index + 1}`)}
            </Typography>
          </Panel>
        </m.div>
      </Grid2>)}
    </Grid2>
  </Section>
}