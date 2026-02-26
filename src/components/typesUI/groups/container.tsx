'use client'

import { useState } from "react";
import { IGroupName } from "@/interfaces";

//mui components
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"

interface GroupsContainerProps<T extends IGroupName> {
  groups: ReadonlyArray<T>
  readonly subjectSlugs: string[]
  render: (group: T) => React.ReactNode
}

export function GroupsContainer<T extends IGroupName>({groups, subjectSlugs, render}: GroupsContainerProps<T>) {
  const [active, setActive] = useState(-1)
  
  return <Stack>
    {subjectSlugs.map((subjectSlug, i) => {
      const subjectGroups = groups.filter(g => g.subjectSlug === subjectSlug)
      return <Accordion key={i} expanded={active === i} onChange={() => setActive(active === i ? -1 : i)}>
        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
          <Typography component="span">{subjectGroups[0].subjectName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={{xs: 'column', md: 'row'}} gap={4}>
            {subjectGroups.map((group, j) => <Stack key={j} sx={{flex: 1}} gap={2}>
              {render(group)}
            </Stack>)}
          </Stack>
        </AccordionDetails>
      </Accordion>
    })}
  </Stack>
}