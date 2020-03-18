import Axios from "axios";
import { GET_APPOINTMENTS_URL } from "./endpoints";

export function deleteAppointment(appointmentId) {
  Axios.delete(GET_APPOINTMENTS_URL + `/${appointmentId}`, {
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  })
    .then(res => window.location.reload())
    .catch(err => console.log(err));
}
