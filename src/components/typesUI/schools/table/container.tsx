'use client'

import { ISchool } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useIsMobile, useSchoolFilters } from "@/hooks";
import { KlassesRange } from "@/components";
import { Panel } from "@/ui";
import { SchoolTableBackdrop } from "./backdrop";

//mui components
import Checkbox from "@mui/material/Checkbox"
import Grid2 from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
//icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"

type SchoolTableContainerProps = React.PropsWithChildren & Omit<
  ReturnType<typeof useSchoolFilters>,
  'filteredSchools' | 'paginatedSchools' | 'currentRows' | 'prevPage' | 'nextPage' | 'page'
> & {
  selectedSchool: ISchool | null
  setSelectedSchool: (school: ISchool | null) => void
}

export function SchoolTableContainer({
  searchQuery, setSearchQuery,
  structuredParams, handleChange,
  params, setParams,
  selectedSchool, setSelectedSchool,
  children
}: SchoolTableContainerProps) {
  const t = useTranslations('schools.filters');
  const isMobile = useIsMobile();

  return <Stack gap={4}>
    <Panel>
      <TextField
        fullWidth
        placeholder={t('search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }
        }}
      />
    </Panel>
    <Accordion defaultExpanded={false} sx={{ 
      boxShadow: 'none',
      bgcolor: 'unset',
      border: 'none',
      '&:before': { display: 'none' },
      '&.Mui-expanded': { margin: 0 }
    }}>
      <Panel sx={{
        p: 1,
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{t('title')}</Typography>
        </AccordionSummary>
      </Panel>
      <AccordionDetails sx={{ p: 0, mt: 2 }}>
        <Grid2 container spacing={2}>
          {structuredParams.map((param, i) => <Grid2 key={i} size={isMobile ? 12 : param.size}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h6'>{t(`${param.name}.title`)}:</Typography>
              <Stack direction='row' gap={4} sx={{flexWrap: 'wrap'}}>
                {param.schoolList.map((val, k) => <Stack key={k} direction='row' sx={{alignItems: 'center'}} gap={2}>
                  <Checkbox checked={param.list.includes(val)} onChange={() => handleChange(param.name, val)} sx={{p: 0}} />
                  <Typography>{param.name === 'langs' ? val : t(`${param.name}.${val}`)}</Typography>
                </Stack>)}
              </Stack>
            </Panel>
          </Grid2>)}
          <Grid2 size={isMobile ? 12 : 4}>
            <KlassesRange
              startGrade={params.startGrade}
              finalGrade={params.finalGrade}
              setGrades={(g1, g2) => setParams(p => ({...p, startGrade: g1, finalGrade: g2}))}
            />
          </Grid2>
        </Grid2>
      </AccordionDetails>
    </Accordion>
    {children}
    <SchoolTableBackdrop selectedSchool={selectedSchool} setSelectedSchool={setSelectedSchool} />
  </Stack>
}