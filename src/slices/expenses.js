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
  async (object) => {
    var response = await api.delete(
      "expenses/" + object.userID + "/" + object._id
    );
    return response.data;
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
        // let index = state.expenses.findIndex(
        //   ({ id }) => id === action.payload
        // );
        // state.expenses.splice(index, 1);
        // console.log("deleteExpense");
        // console.log(action.payload, "hi");
        // console.log(state.expenses);
        // console.log(state);
        state.expenses = state.expenses.filter(
          ({ id }) => id !== action.payload
        );
        state.expenses.splice(
          state.expenses.findIndex((arrow) => arrow._id === action.payload),
          1
        );
      });
  },
});

export default expensesSlice.reducer;
export const { reset } = expensesSlice.actions;
export const selectAllExpenses = (state) => state.expenses.expenses;
