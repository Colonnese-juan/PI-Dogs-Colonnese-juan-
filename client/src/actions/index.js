import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/Dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
