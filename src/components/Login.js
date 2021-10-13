import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { login } from "../slices/auth";

export function Login() {
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

    dispatch(login(userInfo.username, userInfo.password))
      .unwrap()
      .then(() => {
        // props.history.push("/profile");
        // window.location.reload();
        console.log("worked");
      })
      .catch(() => {
        setLoading(false);
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
