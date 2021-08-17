import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHomeCoords,
  updateScreen,
  updateDuration,
  bulkUpdateSelected,
  time,
  updateID,
  updateCoords,
  updateWhen,
  updateCommute,
} from "../actions";

import SelectedTask from "./SelectedTask";

import moment from "moment";
import axios from "axios";

// Screen that displays all selected tasks

const Home = () => {
  const selectedTasks = useSelector((state) => state.selectedTasks.arr);
  // userInfo
  const when = useSelector((state) => state.userInfo.when);
  const work = useSelector((state) => state.userInfo.coords);
  const commute = useSelector((state) => state.userInfo.commute);

  // const length = useSelector((state) => state.time);

  const user_id = useSelector((state) => state.userInfo.user_id);

  const dispatch = useDispatch();

  const [length, setLength] = useState(0); //Total time all tasks will take

  // Turns 'when' input into integers
  let newStr = when.split("");
  newStr.splice(2, 1);
  newStr = newStr.join("");
  let hour = newStr.slice(0, 2);
  let minute = newStr.slice(2, 4);

  // Work out time to wake up
  let wakeUp = moment()
    .hours(hour)
    .minutes(minute)
    .subtract(length, "minutes")
    .format("h:mm");

  useEffect(() => {
    (async function fetchData() {
      // ### USE EFFECT FOR ROUTINE TIME & WORK COORDS/WORK START TIME###
      //
      // Gets total time of users routine
      if (user_id === 0) return;
      const length = await axios.get(
        `http://localhost:6001/get_time/${user_id}`
      );
      setLength(length.data[0].length);

      //
      // gets users work location and when they start work
      const userInfo = await axios.get(
        `http://localhost:6001/get_user_info/${user_id}`
      );

      if (userInfo.data.length === 0) return; // If there is no userInfo then skip the next step
      const work = {
        lat: userInfo.data[0].work_lat,
        lng: userInfo.data[0].work_lng,
      };
      dispatch(updateCoords(work)); //Update local store with work location
      dispatch(updateWhen(userInfo.data[0].start_work)); //Update local store with users start time
    })();
  }, [user_id, dispatch]);

  useEffect(() => {
    (async function fetchData() {
      // Gets coordinates of users home
      // This is to later calculate their commute time
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Sends home and work co-ordinates to backend to get travel time from google
          const travelTime = await axios.post("http://localhost:6001/commute", {
            home: latlng,
            work: work, //Work coords comes from the store which comes from the back end
          });
          dispatch(updateDuration(travelTime.data.data)); //update local store with users commute time
          dispatch(updateHomeCoords(latlng)); // Once updated server - store data locally (Home Coordinates)
        });
      } else {
        // if browser doesn't support geolocation send alert
        alert(
          `Your browser is either blocking or doesn't have geolocation
         - some features of this app will be missing`
        );
      }
      //
      // Sends token from local storage to backend and receives the users saved tasks as a response
      //
      const results = await axios.post("http://localhost:6001/get_tasks", {
        token: localStorage.getItem("token"),
      });
      // Adds data(tasks) received from back end to state in bulk
      dispatch(bulkUpdateSelected(results.data.results)); // sends results to state
      for (let i = 0; i < results.data.results.length; i++) {
        // Adds each length component of each task to store
        dispatch(time(results.data.results[i].length));
      }
      //
      // Sets user ID in state using token if page has been refreshed
      //
      let config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const userID = await axios.get(
        "http://localhost:6001/check_token",
        config
      );
      dispatch(updateID(userID.data));
    })();

    if (work.lat) {
      dispatch(updateCommute(true));
    }
  }, [dispatch, work, commute]);

  return (
    <div className="App">
      {/* If no tasks selected display this */}
      {selectedTasks.length === 0 ? (
        <div className="container">
          <p className="heading">Your Morning Routine</p>
          <p>It Looks Like you haven't got any tasks!</p>
          <p>Start building your morning routine</p>

          <a
            href="/#"
            className="btn build"
            onClick={() => dispatch(updateScreen(2))}
          >
            Build Your Routine
          </a>
        </div>
      ) : // Map over tasks in selected tasks
      selectedTasks.length > 0 ? (
        <div className="selectedTaskContainer">
          {selectedTasks.map((task, index) => {
            return <SelectedTask key={index} task={task} />;
          })}
        </div>
      ) : (
        ""
      )}
      {/* If tasks have been selected then display this */}

      {selectedTasks.length > 0 ? (
        <div className="homeInfoContainer">
          <div className="homeTextContainer">
            <p>Your morning routine should take you {length} minutes</p>
            <p>That means if you want to start work on time</p>
            {/* <p>(and not have to rush)</p> */}
            <p>You'll need to wake up at {wakeUp}</p>
            <p className="small">(To remove a task just click it!)</p>
          </div>

          <div className="btnContainer">
            <a
              href="/#"
              className="btn add"
              onClick={() => dispatch(updateScreen(2))}
            >
              Add More
            </a>
            <a
              href="/#"
              className="btn start"
              onClick={() => dispatch(updateScreen(4))}
            >
              Start Routine
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
