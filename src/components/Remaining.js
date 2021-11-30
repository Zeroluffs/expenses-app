import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { selectAllExpenses } from "../slices/expenses";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export function Remaining() {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  let budget = decodedToken.budget;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let expenses = useSelector(selectAllExpenses);
  let remaining = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);
  remaining = budget - remaining;
  let remainingNoFormat = remaining;
  remaining = currencyFormatter.format(Number(remaining));

  return (
    <div className="">
      <div className="block  text-xl font-bold">Remaining</div>
      <div
        className={
          "pt-3 text-3xl font-semibold " +
          (remainingNoFormat == 0 ? 'text-red-400' : "text-black")
        }
        // className={
        //   parseInt(remainingNoFormat) == 0
        //     ? "pt-3 text-3xl font-semibold text-red-600"
        //     : "pt-3 text-3xl font-semibold text-blue-400"
        // }
      >
        {remaining}
      </div>
    </div>
  );
}
