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
  const [value, setValue] = useState(1);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const onSubmit = async () => {
    if ((name.length > 0) & (value > 0)) {
      const expense = {
        name: name,
        cost: value,
        type: "sub",
      };
      apiCall(expense);
    }
  };
  async function apiCall(body) {
    try {
      let expense = {
        name: body.name,
        cost: body.cost,
        type: body.type,
      };

      const response = await dispatch(addExpense(expense)).unwrap();
      setValue(1);
      setName("");
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
        <Button
          disabled={name.length > 0 ? false : true}
          onClick={onSubmit}
          variant="outlined"
        >
          Add Expense
        </Button>
      </FormControl>
    </div>
  );
}
