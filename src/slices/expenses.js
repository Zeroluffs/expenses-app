import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:3000/api/expenses/`,
});

const initialState = {
  expenses: [],
  status: "idle",
  error: null,
};


