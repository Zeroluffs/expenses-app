import { CollectionsBookmarkOutlined } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const initialState = {
  expenses: [],
  status: "idle",
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userID) => {
    console.log("fetching");
    const response = await api.get("expenses/" + userID);
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (obj) => {
    console.log("here");
    console.log(obj);
    let body = {
      name: obj.name,
      cost: obj.cost,
      type: obj.type,
    };
    console.log(obj.userID);
    const response = await api.post("expenses/" + obj.userID, body);
    return response.data;
  }
);
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (obj) => {
    await api.delete("expenses/" + obj.userID + "/" + obj.expenseID);
    return obj.expenseID;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExpenses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = state.expenses.concat(action.payload);
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        let index = state.expenses.findIndex(
          ({ id }) => id === action.payload.expenseID
        );
        state.expenses.splice(index, 1);
      });
  },
});

export default expensesSlice.reducer;
export const { reset } = expensesSlice.actions;
export const selectAllExpenses = (state) => state.expenses.expenses;
