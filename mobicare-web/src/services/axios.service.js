import axios from "axios";

axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem("token")) {
      config.headers["x-access-token"] = window.localStorage.getItem("token");
    }
    return config;
  },
  error => Promise.reject(error)
);

export async function postRequest(URL, data) {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getRequest(URL) {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    return error.response && error.response.data;
  }
}

export async function putRequest(URL, data) {
  try {
    const response = await axios.put(URL, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function patchRequest(URL, data) {
  try {
    const response = await axios.patch(URL, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
