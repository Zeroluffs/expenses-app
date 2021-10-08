import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Budget() {
  return (
    <Box
      border={1}
      borderRadius={1}
      height={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#5572E8"
      color="#182D81"
      fontSize={18}
    >
      <Typography variant="h6" style={{ fontWeight: "600" }}>
        Budget: $2,000,000 COP
      </Typography>
    </Box>
  );
}
