import React, { Component } from "react";
import { Table, Divider, Button, message, Card, Popover, Input, InputNumber, Select, DatePicker } from "antd";
import axios from "axios";
import { GET_APPOINTMENTS_URL, GET_DOCTORS_URL, GET_PATIENTS_URL, POST_APPOINTMENT_URL } from "../utils/endpoints";
import moment from "moment";
import AppointmentForm from "../components/AppointmentForm";
import { CSVLink } from "react-csv";
import { deleteAppointment } from "../utils/appointments";
import Axios from "axios";

const { Option } = Select;
const { RangePicker } = DatePicker;

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName"
      },
      {
        title: "DoctorName",
        dataIndex: "doctorName",
        key: "doctorName"
      },
      {
        title: "Date & Time",
        dataIndex: "dateTime",
        key: "dateTime"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <Button icon="edit" size="small" onClick={() => this.showEditForm(record)}>
              Edit
            </Button>
            <Divider type="vertical" />
            <Button
              icon="check"
              size="small"
              onClick={() => this.confirmAppointment(record.id)}
              disabled={record.status !== "pending"}
            >
              Confirm
            </Button>
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" onClick={() => this.deleteAppointment(record.id)}>
              Delete
            </Button>
          </span>
        )
      }
    ];
    this.state = {
      appointments: [],
      loading: false,
      formVisible: false,
      filtered: false,
      filters: {},
      csvData: [["id", "date time", "patient name", "doctor name", "status"]],
      patients: [],
      doctors: []
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
  }

  componentDidMount() {
    this.getAppointments();
    axios
      .get(GET_PATIENTS_URL, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(res => this.setState({ patients: res.data.response }))
      .catch(err => console.log(err));
    axios
      .get(GET_DOCTORS_URL, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(res => this.setState({ doctors: res.data.response }))
      .catch(err => console.log(err));
  }

  getAppointments(filters = {}) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `&${key}=${filters[key]}`;
      }
    });

    axios
      .get(GET_APPOINTMENTS_URL + "?filtering=true" + filterString, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        console.log(res.data.response);
        let appointments = res.data.response.map(appointment => {
          return {
            id: appointment._id,
            patientName: appointment.patientId
              ? `${appointment.patientId.firstName} ${appointment.patientId.lastName}`
              : "No patient",
            doctorName: appointment.doctorId
              ? `Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`
              : "No doctor",
            status: appointment.appointmentStatus,
            dateTime: moment(appointment.appointmentDate).format("MMMM Do YYYY, h:mm a")
          };
        });
        this.setState({ appointments, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  toggleForm() {
    this.setState({
      formVisible: !this.state.formVisible,
      mode: "new",
      entry: null
      // window.location.reload();
    });
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getAppointments(this.state.filters);
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getAppointments();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case "doctorId":
        filters.doctorId = value;
        break;
      case "patientId":
        filters.patientId = value;
        break;
      case "dates":
        filters.startDate = moment(value[0]).format("YYYY-MM-DD");
        filters.endDate = moment(value[1]).format("YYYY-MM-DD");
        break;
      case "status":
        filters.appointmentStatus = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  setCSV() {
    // csvData: [["id","email","full name","speciaility","phone","address","degrees","experience","affiliation"]]
    let csvData = this.state.csvData;
    this.state.appointments.map(appointment => {
      let entry = [];
      entry.push(String(appointment.id));
      entry.push(String(appointment.dateTime));
      entry.push(String(appointment.patientName));
      entry.push(String(appointment.doctorName));
      entry.push(String(appointment.status));
      csvData.push(entry);
    });
    this.setState({ csvData: csvData });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: !this.setState.formVisible,
      mode: "edit",
      entry
    });
  };

  confirmAppointment(id) {
    Axios.put(
      POST_APPOINTMENT_URL,
      { id, appointmentStatus: "confirmed" },
      {
        headers: { "x-access-token": localStorage.getItem("token") }
      }
    )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  deleteAppointment(id) {
    Axios.delete(`https://api.seershome.com/api/v1/appointment/${id}`, {
      headers: { "x-access-token": localStorage.getItem("token") }
    })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const { appointments, loading, formVisible, filtered, filters } = this.state;
    return (
      <div>
        <Card
          size="small"
          title="Appointments"
          extra={[
            <Popover
              content={
                <div>
                  <Select
                    placeholder="Please select doctor"
                    onChange={value => this.updateFilter("doctorId", value)}
                    style={{ width: "100%" }}
                  >
                    {this.state.doctors.map(doctor => (
                      <Select.Option value={doctor._id}>{doctor.fullName}</Select.Option>
                    ))}
                  </Select>
                  <br />
                  <br />
                  <Select
                    placeholder="Please select patient"
                    onChange={value => this.updateFilter("patientId", value)}
                    style={{ width: "100%" }}
                  >
                    {this.state.patients.map(doctor => (
                      <Select.Option value={doctor._id}>{doctor.fullName}</Select.Option>
                    ))}
                  </Select>
                  <br />
                  <br />
                  <RangePicker onChange={value => this.updateFilter("dates", value)} />
                  <br />
                  <br />
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Status"
                    onChange={value => this.updateFilter("status", value)}
                    value={this.state.filters.status}
                    disabled={filtered}
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="confirmed">Confirmed</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                  <br />
                  <br />
                  <Button
                    style={{ width: "100%" }}
                    type={filtered ? "danger" : "primary"}
                    icon={filtered ? "delete" : "filter"}
                    onClick={filtered ? this.clearFilters : this.submitFilters}
                    disabled={Object.keys(filters).length === 0}
                  >
                    {filtered ? "Clear filteres" : "Filter"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button icon="filter" style={{ margin: 5 }}>
                Filter
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`doctors-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>,
            <Button type="primary" icon="plus" style={{ margin: 5 }} onClick={this.toggleForm}>
              New Appointment
            </Button>
          ]}
        >
          <Table
            dataSource={appointments}
            columns={this.columns}
            size="small"
            pagination={{
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
        <AppointmentForm
          visible={formVisible}
          toggleForm={this.toggleForm}
          patients={this.state.patients || []}
          doctors={this.state.doctors || []}
          entry={this.state.entry}
          mode={this.state.mode}
        />
      </div>
    );
  }
}

export default Appointments;
