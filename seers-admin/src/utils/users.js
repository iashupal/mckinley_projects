import Axios from "axios";
import { DELETE_USER_URL } from "./endpoints";

export function deleteUser(id, type) {
  Axios.delete(DELETE_USER_URL + `?userId=${id}&userType=${type}`, {
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

// export function confirmDoctor(doctorId, detailId){
//     Axios.put()
// }
