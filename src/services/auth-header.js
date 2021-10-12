export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

//https://www.bezkoder.com/react-hooks-redux-login-registration-example/