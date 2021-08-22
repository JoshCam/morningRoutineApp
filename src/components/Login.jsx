import React, { useState } from "react";
import axios from "axios";
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

  const test = axios.get(
    "https://cors-proxy-joshc.herokuapp.com/https://morning-routine-jc.herokuapp.com/get_tasks"
  );

  console.log(test);

  const register = (e) => {
    e.preventDefault();
    axios
      .post("https://morning-routine-jc.herokuapp.com/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const login = async (e) => {
    e.preventDefault();
    const logInResults = await axios.post(
      "https://morning-routine-jc.herokuapp.com/login",
      {
        username: username,
        password: password,
      }
    );

    if (logInResults.data.loginSuccess === false) {
      setLoginStatus("Wrong user name or password");
    } else {
      localStorage.setItem("token", logInResults.data.token);
      // Check if user has existing info()
      dispatch(updateScreen(0));
      // await checkIfUserInfo();
      const tasksResults = await axios.post(
        "https://morning-routine-jc.herokuapp.com/get_tasks",
        {
          token: logInResults.data.token,
        }
      );
      dispatch(bulkUpdateSelected(tasksResults.data.results)); // sends results to state
      for (let i = 0; i < tasksResults.data.results.length; i++) {
        // Adds each length component of each task to store
        dispatch(time(tasksResults.data.results[i].length));
      }
    }
  };

  // const checkIfUserInfo = async () => {
  //   // This is a WIP - the idea is we send the user to the home screen if we have their info
  //   // if we dont we send them to the info screen
  //   let config = {
  //     headers: {
  //       token: localStorage.getItem("token"),
  //     },
  //   };
  //   const userID = await axios.get("https://morning-routine-jc.herokuapp.com/check_token", config);
  //   console.log("called");
  //   const userInfo = await axios.get(
  //     `https://morning-routine-jc.herokuapp.com/get_user_info/${userID}`
  //   );
  //   if (userInfo.data.length === 0) {
  //     console.log("doesn't have info sent to info");
  //     dispatch(updateScreen(0));
  //   } else {
  //     console.log("has info sent home");
  //     dispatch(updateScreen(1));
  //   }
  // };

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
