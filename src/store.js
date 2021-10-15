import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import expensesReducer from "./slices/expenses";

const reducer = {
  // auth: authReducer,
  expenses: expensesReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
