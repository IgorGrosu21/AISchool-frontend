'use client'

import { useTranslations } from "next-intl";
import { Section, SectionHeader, Card } from "@/ui";
import { motion } from "framer-motion";

//mui components
import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { alpha } from "@mui/material/styles"
//icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import GroupIcon from "@mui/icons-material/Group"

export function SubscriptionPluses() {
  const t = useTranslations('subscriptions.pluses');

  const soloFeatures = t('solo.list').split(';');
  const groupFeatures = t('group.list').split(';');

  const featureCards = [
    {
      icon: AutoAwesomeIcon,
      title: t('solo.title'),
      description: t('solo.desc'),
      color: 'primary' as const,
      features: soloFeatures
    },
    {
      icon: GroupIcon,
      title: t('group.title'),
      description: t('group.desc'),
      color: 'secondary' as const,
      features: groupFeatures
    }
  ];

  return (
    <Section>
      <SectionHeader text1={t('title')} text2={t('desc')} />
      <Grid2 container spacing={4}>
        {featureCards.map((card, index) => <Grid2 size={{ xs: 12, md: 6 }} key={index}>
          <Card index={index}>
            <Stack gap={4} sx={{ height: '100%', p: 2 }}>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Box sx={theme => ({
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette[card.color].main}, ${theme.palette[card.color].main}CC)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: `0 8px 32px ${alpha(theme.palette[card.color].main, 0.25)}`
                })}>
                  <card.icon sx={{ fontSize: 48, color: 'background.default' }} />
                </Box>
              </motion.div>
              <Stack gap={4} sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h4" color={card.color} sx={theme => ({ 
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  textShadow: `0 2px 4px ${alpha(theme.palette[card.color].main, 0.2)}`
                })}>
                  {card.title}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ 
                  fontWeight: 400,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                  opacity: 0.9
                }}>
                  {card.description}
                </Typography>
                <Stack gap={2}>
                  {card.features.map((feature, i) => <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Box sx={theme => ({
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: `${card.color}.main`,
                        flexShrink: 0,
                        boxShadow: `0 2px 8px ${alpha(theme.palette[card.color].main, 0.3)}`,
                      })}/>
                      <Typography variant="body1" color="text.primary" sx={{ 
                        fontWeight: 500,
                        fontSize: '1rem',
                        lineHeight: 1.4
                      }}>
                        {feature}
                      </Typography>
                    </Stack>
                  </motion.div>)}
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid2>)}
      </Grid2>
    </Section>
  );
}
