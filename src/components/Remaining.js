import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { selectAllExpenses } from "../slices/expenses";
import { useSelector } from "react-redux";
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
      height={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={18}
    >
      <Typography variant="subtitle1">
        Remaining:{" "}
        <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
          {remaining}
        </Typography>
      </Typography>
    </Box>
  );
}
