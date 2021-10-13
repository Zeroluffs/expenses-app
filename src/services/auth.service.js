import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const login = (username, password) => {
    console.log(password)
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  //  register,
  login,
  logout,
};
