export const increment = num => {
  return {
    type: "Increment",
    payLoad: num
  };
};

export const decrement = () => {
  return {
    type: "Decrement"
  };
};
