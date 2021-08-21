import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";

import {
  updateScreen,
  updateWhen,
  updateCommute,
  updateWhere,
  updateCoords,
  updateID,
} from "../actions";

// Screen that collects all user info

const Info = () => {
  const when = useSelector((state) => state.userInfo.when);
  const commute = useSelector((state) => state.userInfo.commute);
  const user_id = useSelector((state) => state.userInfo.user_id);
  const work = useSelector((state) => state.userInfo.coords);

  const dispatch = useDispatch();

  const [address, setAddress] = React.useState("");

  const handleSelect = async (value) => {
    // function to get address and coordinates of users work
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    dispatch(updateWhere(value));
    dispatch(updateCoords(latlng));
    // console.log(value); //Address of work
    // console.log(latlng); //Coordinates of work
  };

  let checkUser = (token) => {
    // Gets the user ID from the token they received upon signing in
    let config = {
      headers: {
        token: token,
      },
    };
    // console.log
    axios
      .get("https://morning-routine-jc.herokuapp.com/check_token", config)
      .then((response) => {
        // console.log(response.data); //Logs user Id
        dispatch(updateID(response.data));
      });
  };
  checkUser(localStorage.getItem("token"));

  let addInfoToDB = () => {
    axios.post("https://morning-routine-jc.herokuapp.com/add_user_info", {
      user_id,
      start_work: when,
      work_location: work,
    });
    console.log("called add info");
  };

  let handleClick = () => {
    dispatch(updateScreen(1));
    addInfoToDB();
  };

  return (
    <div className="container">
      <h1>Info</h1>
      <form>
        <label>When do you start work in the morning?</label>
        <br></br>
        <input
          className="when"
          id="when"
          type="time"
          value={when}
          onChange={(e) => dispatch(updateWhen(e.target.value))}
        ></input>
        <br></br>
        <label>Do you commute?</label>
        <br></br>
        <select
          className="commute"
          id="commute"
          value={commute}
          onChange={(e) => dispatch(updateCommute(e.target.value))}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br></br>
        {/* Only display code if user commutes */}
        {commute ? (
          <div>
            {/* If users commute ask where they work */}
            <label>Where do you work?</label>
            <br></br>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    className="where"
                    {...getInputProps({ placeholder: "Address" })}
                  />
                  <div className="outputBox">
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        fontWeight: suggestion.active ? 800 : 400,
                      };
                      return (
                        <div
                          className="outputBox"
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        ) : (
          ""
        )}
        <br></br>
        <a href="/#" className="btn" onClick={() => handleClick()}>
          Finished
        </a>
      </form>
    </div>
  );
};

export default Info;
