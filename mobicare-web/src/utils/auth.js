import jwt_decode from "jwt-decode";

export function signOut() {
  localStorage.removeItem("token");
  window.location = "/";
}

export function getDoctorId() {
  if (window.localStorage.getItem("token")) {
    let doctor = jwt_decode(window.localStorage.getItem("token"));
    return doctor.userId;
  }

  window.location = "/";
}

export function getDoctorName() {
  if (window.localStorage.getItem("token")) {
    let doctor = jwt_decode(window.localStorage.getItem("token"));
    console.log(doctor);
    return {
      firstName: doctor.firstName,
      lastName: doctor.lastName
    };
  }

  window.location = "/";
}
