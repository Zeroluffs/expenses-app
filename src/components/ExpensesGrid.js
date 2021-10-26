import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { selectAllExpenses } from "../slices/expenses";
import { deleteExpense } from "../slices/expenses";
import { EditExpenseForm } from "./EditExpenseForm";

export function ExpensesGrid(props) {
  const dispatch = useDispatch();

  const test = useSelector(selectAllExpenses);
  const [data, setData] = useState([]);
  const deleteUser = useCallback(
    (id) => () => {
      const apiCall = async (expenseID) => {
        try {
          console.log("deleting");
          const response = await dispatch(deleteExpense(expenseID)).unwrap();
        } catch (error) {
          console.log(error);
        }
      };
      apiCall(id._id);
    },
    []
  );
  const editExpense = useCallback((id) => () => {
    props.setMode(true);
  });
  useEffect(() => {
    setData(test);
  }, [test]);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice = {
    headerName: "Cost",
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: "font-tabular-nums",
  };
  const columns = [
    { field: "name", headerName: "Expense", width: 200 },
    { field: "cost", ...usdPrice },
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteUser(params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={editExpense(params.row)}
        />,
      ],
    },
    [deleteUser, editExpense],
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={test} columns={columns} />
    </div>
  );
}
