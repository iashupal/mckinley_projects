import config from "@src/config";
import { create } from "apisauce";

// Base API Init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

func.submitDonation = async (token, donation) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/user/donation", donation);
    console.log("donation response", response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default func;
