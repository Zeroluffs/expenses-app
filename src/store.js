import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expenses";

const reducer = {
  expenses: expensesReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
