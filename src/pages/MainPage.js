import React, { Fragment, useContext, useEffect } from "react";
import { Budget } from "../components/Budget";
import { Remaining } from "../components/Remaining";
import { Spent } from "../components/Spent";
import Grid from "@mui/material/Grid";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { AuthContext } from "../context/auth";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../slices/expenses";
import { ExpensesGrid } from "../components/ExpensesGrid";
import { EditExpenseForm } from "../components/EditExpenseForm";
export function MainPage() {
  const dispatch = useDispatch();

  const user = useContext(AuthContext);
  useEffect(() => {
    var decoded = jwt_decode(user.user.token);
    const response = dispatch(fetchExpenses()).unwrap();
  }, []);

  return (
    <Fragment>
      <Grid justifyContent="center" container spacing={1}>
        <Grid item xs={4}>
          <Budget></Budget>
        </Grid>
        <Grid item xs={4}>
          <Spent></Spent>
        </Grid>
        <Grid item xs={4}>
          <Remaining></Remaining>
        </Grid>
      </Grid>
      <AddExpenseForm />
      <EditExpenseForm />
      <ExpensesGrid></ExpensesGrid>
    </Fragment>
  );
}
