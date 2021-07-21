import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useSelector, useDispatch } from "react-redux";
import {
  updateScreen,
  updateWhen,
  updateCommute,
  updateWhere,
  updateCoords,
} from "../actions";

// Screen that collects all user info

const Info = () => {
  const when = useSelector((state) => state.userInfo.when);
  const commute = useSelector((state) => state.userInfo.commute);
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
        <a href="/#" className="btn" onClick={() => dispatch(updateScreen(1))}>
          Finished
        </a>
      </form>
    </div>
  );
};

export default Info;
