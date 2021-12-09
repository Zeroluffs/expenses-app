import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth";
import jwt_decode from "jwt-decode";
import { EditBudgetModal } from "../components/EditBudgetModal";

export function Budget() {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  const [show, setShow] = useState(false);
  let budget = decodedToken.budget;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  budget = currencyFormatter.format(Number(budget));
  return (
    <div className="relative">
      <EditBudgetModal onClose={() => setShow(false)} show={show} />
      <div className="block text-xl font-bold">Budget</div>
      <div
        className={
          "pt-3 text-3xl font-semibold " +
          (budget <= 0 ? "text-red-600" : "text-black")
        }
      >
        {budget}
      </div>
      <button
        onClick={() => {
          setShow(true);
        }}
        class="absolute top-0  -right-8 lg:-right-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>
  );
}
