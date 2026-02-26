"use client";

import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export type CollapsibleGroupProps = {
  label: string;
  pl: number;
  children: React.ReactNode;
};

export function CollapsibleGroup({
  label,
  pl,
  children,
}: CollapsibleGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ mb: open ? 1 : 0, transition: "margin 0.3s ease-in-out" }}>
      <ListSubheader
        component="button"
        type="button"
        onClick={() => setOpen((o) => !o)}
        sx={{
          pl,
          py: 1,
          bgcolor: "action.hover",
          borderLeft: "3px solid",
          fontWeight: 600,
          lineHeight: 1.5,
          borderColor: "tertiary.main",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          textAlign: "left",
          "&:hover": { bgcolor: "action.selected" },
        }}
      >
        {label}
        {open ? (
          <ExpandLessIcon sx={{ fontSize: 24 }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 24 }} />
        )}
      </ListSubheader>
      <Collapse in={open} timeout="auto" unmountOnExit={false}>
        {children}
      </Collapse>
    </Box>
  );
}
