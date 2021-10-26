import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fontWeight } from "@mui/system";
import { selectAllExpenses } from "../slices/expenses";
import { useDispatch, useSelector } from "react-redux";

export function Spent() {
  const expenses = useSelector(selectAllExpenses);
  const totalSpent = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);
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
        {totalSpent}
      </Typography>
    </Box>
  );
}
