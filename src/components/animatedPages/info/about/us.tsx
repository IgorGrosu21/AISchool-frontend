'use client'

import { Panel, Section, SectionHeader } from "@/ui";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";

//mui components
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import WavingHandIcon from '@mui/icons-material/WavingHand';
import PersonIcon from '@mui/icons-material/Person';

const icons = [
  { icon: WavingHandIcon, color: '#4ECDC4'},
  { icon: PersonIcon, color: '#DDA0DD'},
]

export function AboutUs() {
  const t = useTranslations('animated_pages.info.about.us');

  return <Section id='section1' sx={{display: 'flex', alignItems: 'center'}}>
    <SectionHeader text1={t(`title`)} text2={t(`desc`)} />
    <Stack gap={4} direction={{xs: 'column', md: 'row'}} sx={{width: '100%', maxWidth: 'lg', mx: 'auto', px: 4, zIndex: 2}}>
      {icons.map(({icon: Icon, color}, index) => <m.div
        key={`us-${index}`}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
        style={{flex: 1}}
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
            <Icon sx={{ fontSize: {xs: 24, md: 40}, color: 'background.default' }} />
          </Stack>
          <Stack gap={1} sx={{flex: 1}}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
              fontSize: {xs: '1rem', md: '1.25rem'}
            }}>
              {t(`items.${index + 1}.heading`)}
            </Typography>
            <Typography sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'left',
              fontSize: {xs: '0.75rem', md: '1rem'}
            }}>
              {t(`items.${index + 1}.content`)}
            </Typography>
          </Stack>
        </Panel>
      </m.div>)}
    </Stack>
  </Section>
}