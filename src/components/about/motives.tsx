'use client'

import { Panel, Section, SectionHeader } from "@/ui";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ComputerIcon from '@mui/icons-material/Computer'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

const icons = [
  { icon: TrendingUpIcon, color: '#FF6B6B'},
  { icon: ComputerIcon, color: '#4ECDC4'},
  { icon: AssignmentIcon, color: '#45B7D1'},
  { icon: LightbulbIcon, color: '#96CEB4'}
]

export function AboutMotives() {
  const t = useTranslations('about.motives');

  return <Section id='section2' sx={{display: 'flex', alignItems: 'center'}}>
    <SectionHeader text1={t(`title`)} text2={t(`desc`)} />
    <Stack gap={2} sx={{width: '100%', maxWidth: 'lg', mx: 'auto', px: 4, zIndex: 2}}>
      {icons.map(({icon: Icon, color}, index) => <m.div
        key={`motives-${index}`}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      >
        <Panel direction='row' gap={2} sx={{
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
              textAlign: 'left',
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