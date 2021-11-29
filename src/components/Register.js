import React, { useContext, useState } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth";
const api = axios.create({
  baseURL: `https://myexpenses98-app.herokuapp.com/api`,
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

  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      password: e.target.elements.password?.value,
      username: e.target.elements.username?.value,
      budget: e.target.elements.budget?.value,
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
    <div>
      <div className="mx-auto mt-16 md:mt-20 flex items-center justify-center  w-8/12 h-2/3">
        <div className="text-left">
          <form onSubmit={onSubmit}>
            <div>
              <div className="text-3xl font-bold text-center pb-8 ">
                Register
              </div>
              <label htmlFor="username" className="block font-semibold text-xl">
                Username
              </label>

              <input
                autoFocus
                type="text"
                id="username"
                placeholder="Username"
                error={errors.username ? true : false}
                onChange={onChange}
                className="w-96 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <label
                htmlFor="username"
                className="block font-semibold text-xl mt-4"
              >
                Budget
              </label>

              <input
                type="number"
                id="budget"
                placeholder="Budget"
                error={errors.username ? true : false}
                onChange={onChange}
                className="w-96 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="mt-4">
              <label
                htmlFor="password"
                className="block  font-semibold text-xl"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                error={errors.password ? true : false}
                onChange={onChange}
                class="w-96 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <label
                htmlFor="password"
                className="mt-4 block  font-semibold text-xl"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="confirmpassword"
                error={errors.password ? true : false}
                onChange={onChange}
                className="w-96 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="flex items-baseline justify-between">
              <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Register
              </button>
              <a href="#" class="text-sm text-blue-600 hover:underline">
                Already signed up?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
