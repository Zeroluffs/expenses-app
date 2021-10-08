import React from "react";
import { ExpenseItem } from "./ExpenseItem";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Chip from "@mui/material/Chip";

export const ExpensesList = () => {
  const expenses = [
    { id: 12, name: "shopping", cost: 40 },
    { id: 13, name: "holiday", cost: 400 },
    { id: 14, name: "car service", cost: 50 },
  ];

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          alignItems="center"
          key={value}
          disableGutters
          secondaryAction={
            ((
              <Chip>
                <p>Hi</p>
              </Chip>
            ),
            (
              <IconButton>
                <DeleteOutlineRoundedIcon></DeleteOutlineRoundedIcon>
              </IconButton>
            ))
          }
        >
          <ListItemText primary={`Line item`} />
          <ListItemText>$4365567</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
