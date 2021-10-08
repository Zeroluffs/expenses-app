import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fontWeight } from "@mui/system";

export function Spent() {
  return (
    <Box
      border={1}
      borderRadius={1}
      height={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="#206E20"
      bgcolor="#3ECA3E"
      fontSize={18}
    >
      <Typography variant="h6" style={{ fontWeight: "600" }}>
        Spent: $2,000,000 COP
      </Typography>
    </Box>
  );
}
