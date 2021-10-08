import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

export function AddExpenseForm() {
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        variant="standard"
      />
      <Button variant="outlined">Primary</Button>
    </div>
  );
}
