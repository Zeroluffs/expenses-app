import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { NavBar } from "../components/AppBar";
import "../styles/mainpage/mainpage.css";

export function MainPage() {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [expenseToEdit, setExpenseToEdit] = useState({
    _id: "",
    name: "",
    cost: 1,
    type: "",
  });
  const user = useContext(AuthContext);
  useEffect(() => {
    dispatch(fetchExpenses()).unwrap();
  }, []);

  return (
    <div className="mainPageComponentDivs">
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

      {editMode ? (
        <EditExpenseForm
          setMode={(mode) => setEditMode(mode)}
          expenseToEdit={expenseToEdit}
        />
      ) : (
        <AddExpenseForm />
      )}
      <ExpensesGrid
        setMode={(mode) => setEditMode(mode)}
        setExpense={(expenseToEdit) => setExpenseToEdit(expenseToEdit)}
      ></ExpensesGrid>
    </div>
  );
}
