import axios from "axios";

export function getDogs(name = "") {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/Dogs?name=${name}`);
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemps() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/Dogs/Temps");
    return dispatch({
      type: "GET_TEMPS",
      payload: json.data,
    });
  };
}
