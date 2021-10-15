import React, { Fragment, useContext, useEffect } from "react";
import { Budget } from "../components/Budget";
import { Remaining } from "../components/Remaining";
import { Spent } from "../components/Spent";
import Grid from "@mui/material/Grid";
import { ExpensesList } from "../components/ExpensesList";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { NavigationBar } from "../components/NavigationBar";
import { AuthContext } from "../context/auth";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../slices/expenses";
export function MainPage() {
  const dispatch = useDispatch();

  console.log("hello");
  const user = useContext(AuthContext);
  useEffect(() => {
    console.log("hello world");
    console.log(user.user.token);
    var decoded = jwt_decode(user.user.token);
    console.log(decoded);
    const response = dispatch(fetchExpenses(decoded.id)).unwrap();
    console.log(response);
  }, []);

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
