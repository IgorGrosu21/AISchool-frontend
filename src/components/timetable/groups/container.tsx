'use client'

import { useState } from "react";
import { IGroupName, IKlassNameWithGroups, ISubjectName } from "@/interfaces";

//mui components
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
//icons
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"

interface GroupsContainerProps {
  klass: IKlassNameWithGroups
  subjects: ISubjectName[]
  render: (group: IGroupName) => React.ReactNode
}

export function GroupsContainer({klass, subjects, render}: GroupsContainerProps) {
  const [active, setActive] = useState(-1)
  
  return <Stack>
    {subjects.map((subject, i) => {
      const subjectGroups = klass.groups.filter(g => g.subject.id === subject.id)
      return <Accordion key={i} expanded={active === i} onChange={() => setActive(active === i ? -1 : i)}>
        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
          <Typography component="span">{subject.verboseName}</Typography>
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