const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "Sign In":
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
