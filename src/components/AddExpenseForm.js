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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import "../styles/expenseForm/expenseForm.css";

export function AddExpenseForm() {
  const [radioValue, setRadioValue] = useState("");
  const [value, setValue] = useState(1);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const onSubmit = async () => {
    if ((name.length > 0) & (value > 0)) {
      const expense = {
        name: name,
        cost: value,
        type: radioValue,
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
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
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
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={radioValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="Bills" control={<Radio />} label="Bills" />
          <FormControlLabel
            value="Subscription"
            control={<Radio />}
            label="Subscription"
          />
        </RadioGroup>
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
