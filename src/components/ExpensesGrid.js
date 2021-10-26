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
          const response = await dispatch(deleteExpense(expenseID)).unwrap();
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
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName:"Actions",
      width: 80,
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
