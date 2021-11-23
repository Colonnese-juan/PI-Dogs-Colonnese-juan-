const initialState = {
  dogs: [],
  dogsFound: [],
  dogDetail: {},
  temperaments: [],
  dogsCreated: [],
};

function rootReducer(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "GET_DOGS":
      return { ...state, dogs: action.payload };
  }
}

export default rootReducer;
