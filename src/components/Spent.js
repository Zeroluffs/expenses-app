import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fontWeight } from "@mui/system";
import { selectAllExpenses } from "../slices/expenses";
import { useDispatch, useSelector } from "react-redux";

export function Spent() {
  let expenses = useSelector(selectAllExpenses);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let initialValue = 0;
  let totalSpent = 0;
  totalSpent = expenses.reduce((previousValue, item) => {
    return previousValue + item.cost;
  }, initialValue);
  totalSpent = currencyFormatter.format(Number(totalSpent));
  return (
    <Box
      height={100}
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={18}
    >
      <Typography variant="subtitle1">
        Spent: {"\n"}
        <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
          {" "}
          {totalSpent}
        </Typography>
      </Typography>
    </Box>
  );
}
