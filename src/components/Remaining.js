import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { selectAllExpenses } from "../slices/expenses";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export function Remaining() {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  let budget = decodedToken.budget;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let expenses = useSelector(selectAllExpenses);
  let remaining = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);
  remaining = budget - remaining;
  remaining = currencyFormatter.format(Number(remaining));

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
        Remaining: {remaining}
      </Typography>
    </Box>
  );
}
