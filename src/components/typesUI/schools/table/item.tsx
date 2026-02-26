"use client";

import Image from "next/image";
import { ISchool, IDetailedCountry } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useIsMobile, useSchoolFilters } from "@/hooks";
import { Panel } from "@/ui";
import { useState } from "react";
import { SchoolTableContainer } from "./container";

//mui components
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Grow from "@mui/material/Grow";
//icons
import { SchoolTablePaginator } from "./paginator";

interface SchoolTableProps {
  schools: ISchool[];
  country: IDetailedCountry;
}

export function SchoolTable({ schools, country }: SchoolTableProps) {
  const {
    params,
    setParams,
    structuredParams,
    handleChange,
    filteredSchools,
    paginatedSchools,
    currentRows,
    prevPage,
    nextPage,
    searchQuery,
    setSearchQuery,
    page,
  } = useSchoolFilters(schools, country);

  const t = useTranslations("schools.details");

  const isMobile = useIsMobile();
  const [selectedSchool, setSelectedSchool] = useState<ISchool | null>(null);

  return (
    <SchoolTableContainer
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      structuredParams={structuredParams}
      handleChange={handleChange}
      params={params}
      setParams={setParams}
      selectedSchool={selectedSchool}
      setSelectedSchool={setSelectedSchool}
    >
      <Stack gap={4}>
        <Panel>
          <Typography variant="h5">
            {t("found")} {filteredSchools.length}
          </Typography>
        </Panel>
        <Panel sx={{ overflow: "hidden", borderRadius: 2 }}>
          <TableContainer>
            <Table
              aria-label="schools"
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ width: { xs: "30%", md: "15%" } }}
                  ></TableCell>
                  <TableCell>
                    <Typography variant="h6">{t("name")}</Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="h6">{t("address")}</Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchools.map((school, i) => (
                  <TableRow
                    key={i}
                    onClick={() => setSelectedSchool(school)}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      transition: "background-color 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ py: 2 }}>
                      <Grow in={true} key={school.id}>
                        <Image
                          width={1792}
                          height={1024}
                          src={school?.preview ?? "/images/default-school.png"}
                          alt={`${school.name} preview`}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            aspectRatio: "7/4",
                            height: "auto",
                          }}
                          loading="lazy"
                        />
                      </Grow>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="h6">{school.name}</Typography>
                    </TableCell>
                    {!isMobile && (
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body1" color="text.secondary">
                          {school.address}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                <SchoolTablePaginator
                  currentRows={currentRows}
                  prevPage={prevPage}
                  nextPage={nextPage}
                  page={page}
                  total={filteredSchools.length}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Panel>
      </Stack>
    </SchoolTableContainer>
  );
}
