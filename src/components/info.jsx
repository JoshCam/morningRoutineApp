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
} from "../actions/";

const Info = () => {
  const when = useSelector((state) => state.userInfo.when);
  const commute = useSelector((state) => state.userInfo.commute);
  // const where = useSelector((state) => state.userInfo.where);
  const dispatch = useDispatch();

  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    dispatch(updateWhere(value));
    dispatch(updateCoords(latlng));
    console.log(value); //Address
    console.log(latlng); //Coordinates
  };

  return (
    <div>
      <h1>Info</h1>
      <form>
        <label>When do you start work in the morning?</label>
        <br></br>
        <input
          id="when"
          type="time"
          value={when}
          onChange={(e) => dispatch(updateWhen(e.target.value))}
        ></input>
        <br></br>
        <label>Do you commute?</label>
        <br></br>
        <select
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
                  <input {...getInputProps({ placeholder: "Address" })} />
                  <div>
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
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
        <a onClick={() => dispatch(updateScreen(1))}>
          <button>Finished</button>
        </a>
      </form>
    </div>
  );
};

export default Info;

{
  /* <input
  type="text"
  id="where"
  value={where}
  onChange={(e) => dispatch(updateWhere(e.target.value))}
></input>; */
}
