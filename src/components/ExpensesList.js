import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectAllExpenses } from "../slices/expenses";
import "../styles/expensesList/pagination.css";
import { deleteExpense } from "../slices/expenses";

export const ExpensesList = (props) => {
  const expenses = useSelector(selectAllExpenses);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let cost;
  const removeExpense = (expenseID) => {
    console.log(expenseID);
    const apiCall = async (expenseID) => {
      try {
        await dispatch(deleteExpense(expenseID)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    apiCall(expenseID);
  };

  const editExpense = (expense) => {
    props.setMode(true);
    props.setExpense({
      _id: expense._id,
      name: expense.name,
      cost: expense.cost,
      type: expense.type,
    });
  };
  const expensesPerPage = 5;
  const pagesVisited = pageNumber * expensesPerPage;
  const displayExpenses = expenses
    .slice(pagesVisited, pagesVisited + expensesPerPage)
    .map((expense) => {
      return (
        <div key={expense._id} class="p-2">
          <div class="py-8 px-8 max-w-sm mx-auto bg-gray-50 rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <div class=" space-y-2 sm:text-left">
              <div class="space-y-0.5">
                <p class="text-xl text-blue-600 font-semibold">
                  {expense.name}
                </p>
                <p class="text-xl text-black">
                  {(cost = currencyFormatter.format(Number(expense.cost)))}
                </p>
                <p class="text-gray-400 font-medium">{expense.type}</p>
              </div>
              <div class="space-x-7">
                <button
                  onClick={(e) => {
                    editExpense(expense);
                  }}
                  class="px-4 py-1 text-sm text-blue-600 font-semibold 
               rounded-full border border-purple-200 hover:text-white
             hover:bg-blue-700 hover:border-transparent focus:outline-none "
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    console.log(expense);
                    removeExpense(expense._id);
                  }}
                  class="px-4 py-1 text-sm text-red-600 font-semibold 
            rounded-full border border-purple-200 hover:text-white hover:bg-red-700
            hover:border-transparent focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(expenses.length / expensesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      {displayExpenses}
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        ></ReactPaginate>
      </div>
    </div>
  );
};
