import React, { useState, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
const api = axios.create({
  baseURL: `https://myexpenses98-app.herokuapp.com/api`,
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
  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      username: e.target.elements.username?.value,
      password: e.target.elements.password?.value,
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
      <div class="flex items-center justify-center min-h-screen bg-white-100">
        <div class="px-20 py-20 mt-4 text-left  bg-white shadow-lg">
          <h3 class="text-2xl font-bold text-center">Login</h3>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="username" class="block">
                Username
              </label>
              <input
                autoFocus
                type="text"
                id="username"
                placeholder="Username"
                error={errors.username ? true : false}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="mt-4">
              <label htmlFor="password" class="block">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                error={errors.password ? true : false}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="flex items-baseline justify-between">
              <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
              <a href="#" class="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
