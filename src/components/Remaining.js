import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Remaining() {
  return (
    <Box
      border={1}
      borderRadius={1}
      height={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="#5A1010"
      bgcolor="#FF5050"
      fontSize={18}
    >
      <Typography variant="h6" style={{ fontWeight: "600" }}>
        Remaining: $2,000,000 COP
      </Typography>
    </Box>
  );
}
