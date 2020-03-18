import React, { Component, Fragment } from "react";
import {
  Table,
  Tag,
  Divider,
  Button,
  message,
  Card,
  Popover,
  Input,
  InputNumber
} from "antd";
import PatientForm from "../components/PatientForm";
import axios from "axios";
import { GET_PATIENTS_URL, PURGE_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import moment from "moment";
import { deleteUser } from "../utils/users";
import Axios from "axios";

class Patients extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => (
          <span>
            {record.email}{" "}
            {record.purgeRequest && <Tag color="red">Purge Requested</Tag>}
            {record.deleteRequest && <Tag color="red">Delete Requested</Tag>}
          </span>
        )
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <Button
              icon="edit"
              size="small"
              onClick={() => this.showEditForm(record)}
            >
              Edit
            </Button>
            <Fragment>
              <Divider type="vertical" />
              <Button
                icon="cross"
                size="small"
                onClickCapture={() => deleteUser(record.id, "patient")}
                disabled={!record.purgeRequest}
                onClick={() => this.purge(record.id)}
              >
                Purge
              </Button>
            </Fragment>

            <Divider type="vertical" />
            <Button
              type="danger"
              icon="delete"
              size="small"
              onClickCapture={() => this.deletePatient(record.id)}
            >
              Delete
            </Button>
          </span>
        )
      }
    ];

    this.state = {
      patients: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null,
      filtered: false,
      filters: {},
      csvData: [["id", "age", "email", "name"]],
      entry: {}
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getPatients = this.getPatients.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.purge = this.purge.bind(this);
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  componentDidMount() {
    this.getPatients();
  }

  getPatients(searchText = null, filters = {}) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `&${key}=${filters[key]}`;
      }
    });

    console.log(filterString);

    let searchString = "";
    if (searchText) {
      searchString = `&search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(GET_PATIENTS_URL + searchString + filterString, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        let patients = res.data.response.map(patient => {
          return {
            id: patient._id,
            email: patient.email,
            firstName: patient.firstName,
            lastName: patient.lastName,
            age: moment().diff(patient.dateOfBirth, "years"),
            dob: patient.dateOfBirth,
            name: `${patient.firstName} ${patient.lastName}`,
            purgeRequest: patient.purgeRequest
          };
        });
        this.setState({ patients, loading: false });

        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  toggleForm() {
    this.setState({ formVisible: !this.state.formVisible, mode: "new" });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getPatients(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getPatients(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getPatients();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getPatients();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case "age":
        filters.age = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  setCSV() {
    let csvData = this.state.csvData;
    this.state.patients.map(patient => {
      let entry = [];
      entry.push(String(patient.id));
      entry.push(String(patient.age));
      entry.push(String(patient.email));
      entry.push(String(`${patient.firstName} ${patient.lastName}`));
      csvData.push(entry);
    });
    this.setState({ csvData: csvData });
  }

  showEditForm(entry) {
    this.setState({
      formVisible: !this.state.formVisible,
      mode: "edit",
      entry
    });
  }

  purge(patienId) {
    this.toggleLoading();
    message.loading("Purging in progress", 0);
    axios
      .get(PURGE_URL + `?patientId=${patienId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        this.toggleLoading();
        window.location.reload();
      })
      .catch(err => {
        this.toggleLoading();
        window.location.reload();
      });
  }

  deletePatient(id) {
    Axios.delete(
      `https://api.seershome.com/api/v1/user?userId=${id}&userType=patient`,
      {
        headers: { "x-access-token": localStorage.getItem("token") }
      }
    )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const {
      patients,
      loading,
      formVisible,
      searchText,
      searched,
      filtered,
      filters,
      mode,
      entry
    } = this.state;
    return (
      <div>
        <Card
          size="small"
          title="Patients"
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter patient name/email"
                    onChange={this.handleChange}
                    name="searchText"
                    value={searchText}
                    disabled={searched}
                  />
                  <br />
                  <br />
                  <Button
                    style={{ width: "100%" }}
                    type={searched ? "danger" : "primary"}
                    icon={searched ? "delete" : "search"}
                    onClick={searched ? this.clearSearch : this.submitSearch}
                    disabled={!!!searchText}
                  >
                    {searched ? "Clear search" : "Search"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button
                type="dashed"
                icon="search"
                style={{ margin: 5 }}
                disabled={filtered}
              >
                {searched ? searchText : "Search Patients"}
              </Button>
            </Popover>,
            <Popover
              content={
                <div>
                  <InputNumber
                    placeholder="Age(years)"
                    style={{ width: "100%" }}
                    onChange={value => this.updateFilter("age", value)}
                    value={this.state.filters.experience}
                    disabled={filtered}
                  />
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
              <Button icon="filter" style={{ margin: 5 }} disabled={searched}>
                Filter
              </Button>
            </Popover>,

            <CSVLink
              data={this.state.csvData}
              filename={`patients-${moment(new Date()).toISOString()}.csv`}
            >
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>,
            <Button
              type="primary"
              icon="plus"
              style={{ margin: 5 }}
              onClick={this.toggleForm}
            >
              New Patient
            </Button>
          ]}
        >
          <Table
            dataSource={patients}
            columns={this.columns}
            size="small"
            pagination={{
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
        <PatientForm
          visible={formVisible}
          toggleForm={this.toggleForm}
          mode={mode}
          entry={entry}
        />
      </div>
    );
  }
}

export default Patients;
