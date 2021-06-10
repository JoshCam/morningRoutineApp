import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateScreen,
  updateWhen,
  updateCommute,
  updateWhere,
} from "../actions/";

const Info = () => {
  const when = useSelector((state) => state.userInfo.when);
  const commute = useSelector((state) => state.userInfo.commute);
  const where = useSelector((state) => state.userInfo.where);
  //   const userInfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();

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
            <input
              type="text"
              id="where"
              value={where}
              onChange={(e) => dispatch(updateWhere(e.target.value))}
            ></input>
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
