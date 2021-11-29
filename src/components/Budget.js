import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth";
import jwt_decode from "jwt-decode";

export function Budget() {
  var jwtToken = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(jwtToken);
  let budget = decodedToken.budget;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  budget = currencyFormatter.format(Number(budget));
  return (
    <div className="relative bg-red-500">
      <div className="block bg-red-500">Budget:</div>
      <div>{budget}</div>
      <button class="absolute top-0 right-0">Hi</button>
    </div>
    // <div>
    //   {" "}
    //   <Box
    //     height={100}
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     fontSize={18}
    //   >
    //     <Typography variant="subtitle1">
    //       Budget: {"\n"}
    //       <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
    //         {" "}
    //         {budget}
    //       </Typography>
    //     </Typography>
    //   </Box>
    // </div>
  );
}
