'use client'

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { Section, SectionHeader, Card } from "@/ui";

//mui components
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Grid2 from "@mui/material/Grid2"
import Radio from "@mui/material/Radio"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const t = useTranslations('subscriptions.plans');

  const plans = useMemo(() => [
    { name: 'forever', price: 5800, discount: '-60%', benefit: 10 },
    { name: 'yearly', price: 1000, discount: '-45%', benefit: 8 },
    { name: 'quarter', price: 400, discount: '-12%', benefit: 6 },
    { name: 'monthly', price: 150, discount: '', benefit: 4 }
  ].map(plan => ({
    ...plan,
    price: plan.price
  })), []);

  return <Section>
    <SectionHeader text1={t('title')} text2={t('desc')} />
    <Grid2 container spacing={4} sx={{ maxWidth: 'md' }}>
      {plans.map((plan, index) => {
        return <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
          <Card index={index} onClick={() => setSelectedPlan(index)}>
            <Radio 
              color='primary'
              checked={selectedPlan === index}
              sx={{position: 'absolute', top: 8, right: 8}}
            />
            <Stack gap={4} sx={{ alignItems: 'flex-start' }}>
              <Stack direction="row" gap={2} sx={{alignItems: 'center'}}>
                <Typography variant="h4" color="primary" sx={{fontWeight: 'bold'}}>
                  {t(plan.name)}
                </Typography>
                {plan.discount && <Chip 
                  label={plan.discount} 
                  color="secondary" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />}
              </Stack>
              <Box sx={{width: '100%'}}>
                <Typography variant="h4" color="primary" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                  {plan.price}L
                </Typography>
              </Box>
              <Stack direction="row" sx={{width: '100%', justifyContent: 'flex-end'}}>
                <Rating 
                  value={plan.benefit} 
                  max={10} 
                  readOnly 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                  }} 
                />
              </Stack>
            </Stack>
          </Card>
        </Grid2>}
      )}
    </Grid2>
  </Section>
}
