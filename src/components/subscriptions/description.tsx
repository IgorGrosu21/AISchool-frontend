'use client'

import { Typography, Stack, Box, Grid2, alpha } from "@mui/material";
import { useTranslations } from "next-intl";
import { Info, Group, CheckCircle } from '@mui/icons-material';
import { Section, SectionHeader, Card } from "@/ui";
import { motion } from "framer-motion";

export function SubscriptionDescription() {
  const t = useTranslations('subscriptions.description');

  const descriptionCards = [
    {
      icon: Info,
      title: t('about.title'),
      description: t('about.desc'),
      color: 'primary' as const,
    },
    {
      icon: Group,
      title: t('group.title'),
      description: t('group.desc'),
      color: 'secondary' as const,
      highlight: t('group.discount'),
    }
  ];

  return (
    <Section>
      <SectionHeader text1={t('title')} />
      <Grid2 container spacing={4}>
        {descriptionCards.map((card, index) => <Grid2 size={{ xs: 12, md: 6 }} key={index}>
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
                <Box sx={{flex: 1}} />
                {card.highlight && <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Box sx={theme => ({
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                    mt: 'auto'
                  })}>
                    <Stack direction="row" alignItems="center" gap={2} sx={{ justifyContent: 'center' }}>
                      <CheckCircle color="secondary" sx={{ fontSize: '1.5rem' }} />
                      <Typography 
                        variant="h6" 
                        color="secondary" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.1rem' }
                        }}
                      >
                        {card.highlight}
                      </Typography>
                    </Stack>
                  </Box>
                </motion.div>}
              </Stack>
            </Stack>
          </Card>
        </Grid2>)}
      </Grid2>
    </Section>
  );
}
