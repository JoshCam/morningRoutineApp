import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bulkUpdateSelected, updateScreen, time } from "../actions";

const Login = () => {
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false); // If register is false show login screen else register screen

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = (e) => {
    // Send backend new user details and refresh screen
    // so that user gets sent to login and inputs get cleared
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
    window.location.reload();
  };

  const login = async (e) => {
    // send backend username & password and await response
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
      dispatch(updateScreen(0));
      // await checkIfUserInfo();
      // If user does have existing info send them to the home screen else send them to
      // the user Info screen to grab info
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
  //   // if we don't we send them to the info screen
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
      <div className="sunriseContainer">
        <div className="backgroundImg"></div>
        <div className="gradient">
          <div className="textContainer">
            <span className="good">GOOD</span>
            <span className="morning">MORNING</span>
          </div>
        </div>
      </div>
      {!isRegister ? (
        <form className="loginReg">
          {/* === LOGIN ==== */}
          <div className="signinText">
            <p>sign In To</p>
            <p>Build Your Perfect Morning Routine</p>
          </div>
          {/* <label className="label">username</label> */}
          <input
            placeholder="Username"
            className="input"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {/* <label className="label">Password</label> */}
          <input
            placeholder="Password"
            className="input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a href="/#" className="btn" onClick={login}>
            Login
          </a>
          <p>{loginStatus}</p>
          <p>
            Don't have an account?{" "}
            <span className="boldText" onClick={() => setIsRegister(true)}>
              Register Here
            </span>
          </p>
        </form>
      ) : (
        <form className="loginReg">
          {/* === REGISTER === */}
          <h1>Register</h1>
          <label className="label">username</label>
          <input
            placeholder="Username"
            className="input"
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label className="label">email</label>
          <input
            placeholder="Email"
            className="input"
            type="text"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <label className="label">Password</label>
          <input
            placeholder="Password"
            className="input"
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <a href="/#" className="btn" type="submit" onClick={register}>
            Register
          </a>
          <p>
            Back to{" "}
            <span className="boldText" onClick={() => setIsRegister(false)}>
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
