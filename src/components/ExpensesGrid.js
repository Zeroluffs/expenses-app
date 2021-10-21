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
const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

export function ExpensesGrid() {
  const dispatch = useDispatch();

  const test = useSelector(selectAllExpenses);
  const [data, setData] = useState([]);
  const deleteUser = useCallback(
    (id) => () => {
      // console.log(id);

      console.log("to delete");
      console.log(id);
      // console.log(id.userID, id._id);
      const apiCall = async (id) => {
        try {
          const response = await dispatch(deleteExpense(id)).unwrap();
          // console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      apiCall(id);
      // console.log(response);
      // console.log(obj);
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

  // async function apiCall(obj) {
  //   try {
  //     const response = await dispatch(deleteExpense(obj)).unwrap();
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={test} columns={columns} />
    </div>
  );
}
