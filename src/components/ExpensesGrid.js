import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectAllExpenses } from "../slices/expenses";
import { deleteExpense } from "../slices/expenses";

export function ExpensesGrid() {
  const dispatch = useDispatch();

  const test = useSelector(selectAllExpenses);
  const [data, setData] = useState([]);
  const deleteUser = useCallback(
    (id) => () => {
      const apiCall = async (expenseID) => {
        try {
          console.log("deleting");
          console.log(id);
          const response = await dispatch(deleteExpense(expenseID)).unwrap();
          // console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      apiCall(id._id);
    },
    []
  );
  useEffect(() => {
    setData(test);
  }, [test]);
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "cost", headerName: "Cost", width: 200 },
    {
      field: "actions",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteUser(params.row)}
        />,
      ],
    },
    [deleteUser],
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={test} columns={columns} />
    </div>
  );
}
