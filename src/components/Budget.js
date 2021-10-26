import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth";
import jwt_decode from "jwt-decode";

export function Budget() {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  let budget = decodedToken.budget;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  budget = currencyFormatter.format(Number(budget));
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
        Budget: {budget}
      </Typography>
    </Box>
  );
}
