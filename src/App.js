import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { MainPage } from "./pages/MainPage";
import { Login } from "./components/Login";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/mainpage" component={MainPage} />
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
