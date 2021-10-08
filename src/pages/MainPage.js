import React, { Fragment } from "react";
import { Budget } from "../components/Budget";
import { Remaining } from "../components/Remaining";
import { Spent } from "../components/Spent";
import Grid from "@mui/material/Grid";
import { ExpensesList } from "../components/ExpensesList";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { NavigationBar } from "../components/NavigationBar";
export function MainPage() {
  return (
    <Fragment>
      <Grid justifyContent="center" container spacing={1}>
        <Grid item xs={6}>
          <Budget></Budget>
        </Grid>
        <Grid item xs={6}>
          <Spent></Spent>
        </Grid>
        <Grid item xs={6}>
          <Remaining></Remaining>
        </Grid>
      </Grid>
      <AddExpenseForm />
      <ExpensesList></ExpensesList>
      <NavigationBar></NavigationBar>
    </Fragment>
  );
}
