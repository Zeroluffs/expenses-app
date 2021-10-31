import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

import { AuthContext } from "../context/auth";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [state, setState] = React.useState({
    username: "",
    password: "",
    budget: "",
  });
  const onChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      password: state.password,
      username: state.username,
      budget: state.budget,
    };
    console.log(userInfo);
    api
      .post("/users/", userInfo)
      .then((res) => {
        if (res.status === 200) {
          const loggedUser = {
            username: res.data.user.username,
            token: res.data.token,
            createdAt: res.data.user.created,
            budget: res.data.user.budget,
            games: res.data.user.games,
          };
          context.login(loggedUser);
          props.history.push("/mainpage");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Logging in please try again");
      });
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          //   value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Bugdet"
          placeholder="Budget.."
          name="budget"
          type="budget"
          //   value={values.email}
          error={errors.budget ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          //   value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          //   value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
