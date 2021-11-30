import React, { useEffect, useState } from "react";
import { Budget } from "../components/Budget";
import { Remaining } from "../components/Remaining";
import { Spent } from "../components/Spent";
import Grid from "@mui/material/Grid";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "../slices/expenses";
import { EditExpenseForm } from "../components/EditExpenseForm";
import { ExpensesList } from "../components/ExpensesList";
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
  useEffect(() => {
    dispatch(fetchExpenses()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainPageComponentDivs">
      {/* <Grid justifyContent="center" container spacing={1}>
        <Grid item xs={4}>
          <Budget></Budget>
        </Grid>
        <Grid item xs={4}>
          <Spent></Spent>
        </Grid>
        <Grid item xs={4}>
          <Remaining></Remaining>
        </Grid>
      </Grid> */}
      <div className="flex justify-evenly mt-11">
        <div>
          <Budget />
        </div>
        <div>
          <Spent />
        </div>
        <div>
          <Remaining />
        </div>
      </div>
      {editMode ? (
        <EditExpenseForm
          setMode={(mode) => setEditMode(mode)}
          expenseToEdit={expenseToEdit}
        />
      ) : (
        <AddExpenseForm />
      )}
      <ExpensesList
        setMode={(mode) => setEditMode(mode)}
        setExpense={(expenseToEdit) => setExpenseToEdit(expenseToEdit)}
      ></ExpensesList>
    </div>
  );
}
