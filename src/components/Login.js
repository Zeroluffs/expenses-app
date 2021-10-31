import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export function Login() {
  const history = useHistory();
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    username: "",
    password: "",
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
      username: state.username,
      password: state.password,
    };
    setLoading(true);

    api
      .post("/users/login", userInfo)
      .then((res) => {
        if (res.status === 200) {
          const loggedUser = {
            username: res.data.user.username,
            token: res.data.token,
            expenses: res.data.user.expenses,
          };
          context.login(loggedUser);
          history.push({
            pathname: `/mainpage`,
          });
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
    <div>
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <h1>Login</h1>
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
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            //   value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Login
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
    </div>
  );
}
