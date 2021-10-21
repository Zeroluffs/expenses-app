import axios from "axios";
import jwt_decode from "jwt-decode";
const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const addExpense = async (expense) => {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  var response = await api.post("expenses/" + decodedToken.id, expense);
  return response.data;
};

const fetchExpenses = async () => {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  var response = await api.get("expenses/" + decodedToken.id);
  return response.data;
};

const deleteExpense = async (expenseID) => {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  var response = await api.delete(
    "expenses/" + decodedToken.id + "/" + expenseID
  );
  return response.data;
};
const expenseService = {
  addExpense,
  fetchExpenses,
  deleteExpense
};
export default expenseService;
