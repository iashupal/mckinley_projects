import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Card, Popover, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { GET_DOCTORS_URL, PUT_PATIENTS_URL } from "../utils/endpoints";
import DoctorForm from "../components/DoctorForm";
import { CSVLink } from "react-csv";
import moment from "moment";
import Axios from "axios";
const { Option } = Select;

class Doctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null,
      filtered: false,
      filters: {},
      csvData: [["id", "email", "full name", "speciaility", "phone", "address", "degrees", "experience", "affiliation"]]
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getDoctors = this.getDoctors.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Speciality",
        dataIndex: "speciality",
        key: "speciality"
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Degrees",
        dataIndex: "degrees",
        key: "degrees"
      },
      {
        title: "Experience",
        dataIndex: "experience",
        key: "experience"
      },
      {
        title: "Affiliation",
        dataIndex: "affiliation",
        key: "affiliation"
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <Button icon="edit" size="small" onClick={() => this.showEditForm(record)}>
              Edit
            </Button>
            {!record.isConfirmed && (
              <Fragment>
                <Divider type="vertical" />
                <Button icon="check" size="small" onClick={() => this.confirmDoctor(record.id, record.detailId)}>
                  Confirm
                </Button>
              </Fragment>
            )}
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" onClick={() => this.deleteDoctor(record.id)}>
              Delete
            </Button>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getDoctors();
  }

  getDoctors(searchText = null, filters = {}) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `&${key}=${filters[key]}`;
      }
    });

    let searchString = "";
    if (searchText) {
      searchString = `&search=${searchText}`;
    }

    axios
      .get(GET_DOCTORS_URL + searchString + filterString, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        console.log(res.data.response);
        let doctors = res.data.response.map(doctor => {
          return {
            key: doctor._id,
            id: doctor._id,
            email: doctor.email,
            name: `${doctor.firstName} ${doctor.lastName}`,
            phone: String(doctor.doctorDetail[0].phone) || null,
            address: doctor.doctorDetail[0].address || null,
            experience: `${doctor.doctorDetail[0].experience} years` || null,
            speciality: doctor.doctorDetail[0].speciality || null,
            affiliation: doctor.doctorDetail[0].affiliation || null,
            degrees: doctor.doctorDetail[0].degree.length || null,
            doctorDetail: doctor.doctorDetail,
            fullName: doctor.fullName,
            degreeDetails: doctor.doctorDetail[0].degree,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            isConfirmed: doctor.isConfirmed,
            detailId: doctor.doctorDetail[0]._id
          };
        });
        this.setState({ doctors, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  showForm() {
    this.setState({
      formVisible: true,
      mode: "new",
      entry: { degreeDetails: [] }
    });
  }

  hideForm() {
    this.setState({
      formVisible: false,
      entry: { degreeDetails: [] }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getDoctors(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getDoctors(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getDoctors();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getDoctors();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case "experience":
        filters.experience = value;
        break;
      case "status":
        filters.isConfirmed = value;
        break;
      case "speciality":
        filters.speciality = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  setCSV() {
    // csvData: [["id","email","full name","speciaility","phone","address","degrees","experience","affiliation"]]
    let csvData = this.state.csvData;
    this.state.doctors.map(doctor => {
      let entry = [];
      let degrees = [];
      doctor.degreeDetails.map(degree => {
        degrees.push(`[${degree.id}-${degree.name}-${degree.year}]`);
      });
      entry.push(String(doctor.id));
      entry.push(String(doctor.email));
      entry.push(String(doctor.fullName));
      entry.push(String(doctor.doctorDetail[0].speciality));
      entry.push(String(doctor.doctorDetail[0].phone));
      entry.push(String(doctor.doctorDetail[0].address));
      entry.push(degrees);
      entry.push(String(doctor.doctorDetail[0].experience));
      entry.push(String(doctor.doctorDetail[0].affiliation));
      csvData.push(entry);
    });
    this.setState({ csvData: csvData });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

  confirmDoctor(doctorId, detailId) {
    axios
      .put(
        PUT_PATIENTS_URL,
        { id: doctorId, detailId, isConfirmed: true, userType: "doctor" },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  deleteDoctor(id) {
    Axios.delete(`https://api.seershome.com/api/v1/user?userId=${id}&userType=doctor`, {
      headers: { "x-access-token": localStorage.getItem("token") }
    })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const { doctors, loading, formVisible, searchText, searched, filtered, filters, mode, entry } = this.state;
    return (
      <div>
        <Card
          size="small"
          title={searched ? `Results for "${searchText}"` : "Doctors"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter doctor name/email"
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
              <Button type="dashed" icon="search" style={{ margin: 5 }} disabled={filtered}>
                {searched ? searchText : "Search Doctors"}
              </Button>
            </Popover>,
            <Popover
              content={
                <div>
                  <InputNumber
                    placeholder="Experience(years)"
                    style={{ width: "100%" }}
                    onChange={value => this.updateFilter("experience", value)}
                    value={this.state.filters.experience}
                    disabled={filtered}
                  />
                  <br />
                  <br />
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Status"
                    onChange={value => this.updateFilter("status", value)}
                    value={this.state.filters.status}
                    disabled={filtered}
                  >
                    <Option value={"true"}>Confirmed</Option>
                    <Option value={"false"}>Pending</Option>
                  </Select>
                  <br />
                  <br />
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Speciality"
                    onChange={value => this.updateFilter("speciality", value)}
                    value={this.state.filters.speciality}
                    disabled={filtered}
                  >
                    <Option value="Accident and emergency medicine">Accident and emergency medicine</Option>
                    <Option value="Allergology">Allergology</Option>
                    <Option value="Anaesthetics">Anaesthetics</Option>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Child psychiatry">Child psychiatry</Option>
                    <Option value="Clinical biology">Clinical biology</Option>
                    <Option value="Clinical chemistry">Clinical chemistry</Option>
                    <Option value="Clinical neurophysiology">Clinical neurophysiology</Option>
                    <Option value="Craniofacial surgery">Craniofacial surgery</Option>
                    <Option value="Dermatology">Dermatology</Option>
                    <Option value="Endocrinology">Endocrinology</Option>
                    <Option value="Family and General Medicine">Family and General Medicine</Option>
                    <Option value="Gastroenterologic surgery">Gastroenterologic surgery</Option>
                    <Option value="Gastroenterology">Gastroenterology</Option>
                    <Option value="General Practice">General Practice</Option>
                    <Option value="General surgery">General surgery</Option>
                    <Option value="Geriatrics">Geriatrics</Option>
                    <Option value="Hematology">Hematology</Option>
                    <Option value="Immunology">Immunology</Option>
                    <Option value="Infectious diseases">Infectious diseases</Option>
                    <Option value="Internal medicine">Internal medicine</Option>
                    <Option value="Laboratory medicine">Laboratory medicine</Option>
                    <Option value="Microbiology">Microbiology</Option>
                    <Option value="Nephrology">Nephrology</Option>
                    <Option value="Neuropsychiatry">Neuropsychiatry</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="Neurosurgery">Neurosurgery</Option>
                    <Option value="Nuclear medicine">Nuclear medicine</Option>
                    <Option value="Obstetrics and gynaecology">Obstetrics and gynaecology</Option>
                    <Option value="Occupational medicine">Occupational medicine</Option>
                    <Option value="Ophthalmology">Ophthalmology</Option>
                    <Option value="Oral and maxillofacial surgery">Oral and maxillofacial surgery</Option>
                    <Option value="Orthopaedics">Orthopaedics</Option>
                    <Option value="Otorhinolaryngology">Otorhinolaryngology</Option>
                    <Option value="Paediatric surgery">Paediatric surgery</Option>
                    <Option value="Paediatrics">Paediatrics</Option>
                    <Option value="Pathology">Pathology</Option>
                    <Option value="Pharmacology">Pharmacology</Option>
                    <Option value="Physical medicine and rehabilitation">Physical medicine and rehabilitation</Option>
                    <Option value="Plastic surgery">Plastic surgery</Option>
                    <Option value="Podiatric surgery">Podiatric surgery</Option>
                    <Option value="Preventive medicine">Preventive medicine</Option>
                    <Option value="Psychiatry">Psychiatry</Option>
                    <Option value="Public health">Public health</Option>
                    <Option value="Radiation Oncology">Radiation Oncology</Option>
                    <Option value="Radiology">Radiology</Option>
                    <Option value="Respiratory medicine">Respiratory medicine</Option>
                    <Option value="Rheumatology">Rheumatology</Option>
                    <Option value="Stomatology">Stomatology</Option>
                    <Option value="Thoracic surgery">Thoracic surgery</Option>
                    <Option value="Tropical medicine">Tropical medicine</Option>
                    <Option value="Urology">Urology</Option>
                    <Option value="Vascular surgery">Vascular surgery</Option>
                    <Option value="Venereology">Venereology</Option>
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
                    {filtered ? "Clear filters" : "Filter"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button icon="filter" style={{ margin: 5 }} disabled={searched}>
                Filter
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`doctors-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>,
            <Button type="primary" icon="plus" style={{ margin: 5 }} onClick={this.showForm}>
              New Doctor
            </Button>
          ]}
        >
          <Table
            dataSource={doctors}
            columns={this.columns}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
        <DoctorForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default Doctors;
