"use client";

import { useTranslations } from "next-intl";
import type { IExam } from "@/interfaces";
import { ALL_TYPES, getPresentProfilesAndTypes } from "@/utils/exams";

//mui components
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { ExamsTableCell } from "./cell";

export type ExamsTableProps = {
  examList: IExam[];
};

export function ExamsTable({ examList }: ExamsTableProps) {
  const t = useTranslations("animated_pages.exams");
  const { profiles } = getPresentProfilesAndTypes(examList);

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ mb: 2, border: "0" }}
    >
      <Table
        stickyHeader
        sx={{
          tableLayout: "fixed",
          "& .MuiTableCell-root": {
            py: 1.5,
            px: 2,
            width: "20%",
            minWidth: "20%",
            maxWidth: "20%",
            boxSizing: "border-box",
            borderColor: "divider",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }} />
            {ALL_TYPES.map((type) => (
              <TableCell key={type} sx={{ fontWeight: 600 }} align="center">
                {t(`filters.types.${type}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow
              key={profile}
              sx={{
                "&:last-child td": { border: 0 },
              }}
            >
              <TableCell sx={{ fontWeight: 500 }}>
                {t(`filters.profiles.${profile}`)}
              </TableCell>
              {ALL_TYPES.map((type) => (
                <TableCell key={type} align="center">
                  <ExamsTableCell
                    exams={examList.filter(
                      (e) => e.profile === profile && e.type === type,
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
