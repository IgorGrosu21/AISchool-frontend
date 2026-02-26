"use client";

import { useTranslations } from "next-intl";
import type { IOlympiad } from "@/interfaces";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { OlympiadsTableCell } from "./cell";

const COLUMN_KEYS = [
  "test1",
  "barem1",
  "answers1",
  "test2",
  "barem2",
  "answers2",
  "results",
] as const;

export type OlympiadsTableProps = {
  olympiadList: IOlympiad[];
};

export function OlympiadsTable({ olympiadList }: OlympiadsTableProps) {
  const t = useTranslations("animated_pages.olympiads");

  if (olympiadList.length === 0) return null;

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
            boxSizing: "border-box",
            borderColor: "divider",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              {t("filters.lang")}
            </TableCell>
            {COLUMN_KEYS.map((key) => (
              <TableCell key={key} sx={{ fontWeight: 600 }} align="center">
                {t(`list.links.${key}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {olympiadList.map((item, i) => (
            <TableRow
              key={i}
              sx={{
                "&:last-child td": { border: 0 },
              }}
            >
              <TableCell align="center" sx={{ fontWeight: 500 }}>
                {item.lang}
              </TableCell>
              {COLUMN_KEYS.map((key) => (
                <TableCell key={key} align="center">
                  <OlympiadsTableCell olympiad={item} linkKey={key} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
