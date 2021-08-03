import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { bulkUpdateSelected, updateScreen, time } from "../actions";

const Login = () => {
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:6001/register", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const logInResults = await Axios.post("http://localhost:6001/login", {
      username: username,
      password: password,
    });

    if (logInResults.data.loginSuccess === false) {
      setLoginStatus("Wrong user name or password");
    } else {
      localStorage.setItem("token", logInResults.data.token);
      dispatch(updateScreen(0));
      const tasksResults = await Axios.post("http://localhost:6001/get_tasks", {
        token: logInResults.data.token,
      });
      dispatch(bulkUpdateSelected(tasksResults.data.results)); // sends results to state
      for (let i = 0; i < tasksResults.data.results.length; i++) {
        // Adds each length component of each task to store
        dispatch(time(tasksResults.data.results[i].length));
      }
    }
  };

  return (
    <div className="App">
      {!isRegister ? (
        <form className="login">
          {/* === LOGIN ==== */}
          <h1>Login</h1>
          <label>username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}>Login</button>
          <p>{loginStatus}</p>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsRegister(true)}>Register Here</span>
          </p>
        </form>
      ) : (
        <form className="register">
          {/* === REGISTER === */}
          <h1>Register</h1>
          <label>username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label>email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <button type="submit" onClick={register}>
            Register
          </button>
          <p>
            Back to <span onClick={() => setIsRegister(false)}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
