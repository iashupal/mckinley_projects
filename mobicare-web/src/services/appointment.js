import { getRequest, putRequest } from './axios.service';

import {
	APPOINTMENT_LIST_URL,
	CONFIRM_APPOINTMENT_URL,
	NEXT_APPOINTMENT_URL
} from '../utils/api';
import { getDoctorId } from '../utils/auth';

async function appointmentList(dataObject) {
	let query = '?doctorId=' + getDoctorId();
	let add = '&';
	for (let key in dataObject) {
		query += `${add}${key}=${dataObject[key]}`;
	}

	return getRequest(APPOINTMENT_LIST_URL + query);
}

async function confirmAppointment(appointmentId) {
	const data = {
		id: appointmentId,
		confirm: true,
		confirmedByDoctor: true,
		userType: 'doctor',
		appointmentStatus: 'confirmed'
	};
	return putRequest(CONFIRM_APPOINTMENT_URL, data);
}

async function cancelAppointment(appointmentId) {
	const data = {
		id: appointmentId,
		confirm: false,
		appointmentStatus: 'cancelled'
	};
	return putRequest(CONFIRM_APPOINTMENT_URL, data);
}

async function getNextAppoinmentDetails(doctorId) {
	let query = '?doctorId=' + doctorId;
	return getRequest(NEXT_APPOINTMENT_URL + query);
}

export default {
	appointmentList,
	confirmAppointment,
	cancelAppointment,
	getNextAppoinmentDetails
};
