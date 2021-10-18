import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/auth";
import { addExpense } from "../slices/expenses";
import jwt_decode from "jwt-decode";
import "../styles/expenseForm/expenseForm.css";

export function AddExpenseForm() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const onSubmit = async () => {
    const decoded = jwt_decode(context.user.token);
    const expense = {
      name: name,
      cost: value,
      type: "sub",
    };
    apiCall(decoded.id, expense);
  };
  async function apiCall(userID, body) {
    try {
      let obj = {
        userID: userID,
        name: body.name,
        cost: body.cost,
        type: body.type,
      };
      console.log(obj);
      const response = await dispatch(addExpense(obj)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="expenseForm">
      <FormControl sx={{ m: 3 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
        <Input
          value={value}
          type="number"
          id="standard-adornment-amount"
          onChange={(event) => setValue(event.target.value)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        <TextField
          value={name}
          id="standard-multiline-flexible"
          label="Expense Name"
          multiline
          maxRows={4}
          onChange={(event) => setName(event.target.value)}
          variant="standard"
        />
        <Button onClick={onSubmit} variant="outlined">
          Add Expense
        </Button>
      </FormControl>
    </div>
  );
}
