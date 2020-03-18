import React, { Component, Fragment } from "react";
import { Typography, Input, Row, Col, Button, Table, Empty } from "antd";
import "../assets/styles/patients.css";
import moment from "moment";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import patientService from "../services/patients";
import Axios from "axios";
import heartrate from "../assets/images/heartrate.png";
import { PATIENT_DETAIL_URL } from "../utils/api";

const { Title } = Typography;
const { Column } = Table;

function* nextUniqueKey() {
  var number = 1;
  while (true) {
    yield number++;
  }
}
let numberGenerator = nextUniqueKey();
class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        totalRecords: 0,
        currentPage: 1
      },
      searchText: "",
      loading: false
    };

    this.handlePagination = this.handlePagination.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.getPatients = this.getPatients.bind(this);
    this.showPatient = this.showPatient.bind(this);
  }

  handlePagination(page) {
    this.getPatients(page);
  }

  async searchPatient(event) {
    if (event.target.value === "") {
      this.getPatients(1);
    } else {
      let patientsSearch = this.state.data.filter(patient => {
        const fullName = patient.patient[0].firstName + patient.patient[0].lastName;
        console.log(event);
        return fullName.indexOf(event.target.value) !== -1;
      });

      this.setState({ data: patientsSearch });
    }
  }

  showPatient(record) {
    this.updatePatientSeen(record._id);
    this.props.history.push(`/profile/${record.patientId}`);
  }

  updatePatientSeen(id) {
    Axios.patch(
      "https://api.seershome.com/api/v1/patient",
      {
        id: id
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPatients(1);
  }

  async getPatients(page) {
    const offset = (page - 1) * 10;
    this.setState({ loading: true });
    let patients = await patientService.patientList(offset);

    this.setState({
      data: patients.response,
      pagination: {
        totalRecords: patients.totalRecords,
        currentPage: page
      },
      loading: false
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="">
          <Col span={12}>
            <img style={{ marginRight: "20px", width: "30px" }} src={heartrate} alt="Heartrate" />
            <div style={{ display: "inline-block" }}>
              <Title type="secondary" level={4} style={{ color: "black", fontWeight: "500" }}>
                Patient
              </Title>
            </div>
          </Col>
          <Col span={12}>
            <div className="patients__search-input-wrapper">
              <Input
                style={{ width: "200px", float: "left", borderRadius: 0, border: "transparent" }}
                placeholder="Search patients"
                type="text"
                name="patientSearch"
                onChange={this.searchPatient}
              />
              <button className="patient_searchBtn" onClick={this.searchPatient}>
                Search
              </button>
            </div>
          </Col>
        </Row>
        <Row className="patients">
          <Col span={24}>
            {this.state.data.length > 0 && this.state.data[0].patient.length === 0 ? (
              <Empty />
            ) : (
              <Table
                className="message-table"
                pagination={false}
                dataSource={this.state.data}
                onRowClick={this.showPatient}
                rowKey={() => numberGenerator.next().value}
                loading={this.state.loading}
              >
                <Column
                  title="Status"
                  className="column-header"
                  dataIndex="isViewed"
                  key="isViewed"
                  render={isViewed => (isViewed ? "" : <span className="active-point" />)}
                />
                <Column
                  title="Name"
                  className="column-header"
                  dataIndex="patient"
                  key="patient"
                  render={(patient, record) => (
                    <span className="normal-text">
                      {patient[0].firstName} {patient[0].lastName}
                    </span>
                  )}
                />
                <Column
                  title="Age"
                  className="column-header"
                  dataIndex="age"
                  key="age"
                  render={age => <span className="normal-text">{age || "-"}</span>}
                />
                <Column
                  title="Measurements"
                  className="column-header"
                  dataIndex="measurement"
                  key="measurement"
                  render={measurement => <span className="normal-text">{measurement.length}</span>}
                />
                <Column
                  title="Images"
                  className="column-header"
                  dataIndex="numOfImages"
                  key="numOfImages"
                  render={numOfImages => <span className="normal-text">{numOfImages}</span>}
                />
                <Column
                  title="Assessments"
                  className="column-header"
                  dataIndex="numOfAssessment"
                  key="numOfAssessment"
                  render={numOfAssessment => {
                    return <span className="normal-text">{numOfAssessment}</span>;
                  }}
                />
                <Column
                  title="Messages"
                  className="column-header"
                  dataIndex="noOfMessage"
                  key="noOfMessage"
                  render={noOfMessage => <span className="normal-text">{noOfMessage}</span>}
                />
              </Table>
            )}
          </Col>
        </Row>
        {this.state.data.length > 0 && this.state.data[0].patient.length > 0 && (
          <Pagination
            changeHandler={this.handlePagination}
            current={this.state.pagination.currentPage}
            totalRecords={this.state.pagination.totalRecords}
          />
        )}
      </div>
    );
  }
}

export default Patients;
