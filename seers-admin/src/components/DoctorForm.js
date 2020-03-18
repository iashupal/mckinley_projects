import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, message } from "antd";
import moment from "moment";
import { PUT_PATIENTS_URL, REGISTER_DOCTOR } from "../utils/endpoints";
import Axios from "axios";

const { Option } = Select;

class DoctorFormRaw extends React.Component {
  state = {
    visible: false,
    degreeFormVisible: false,
    degree: {},
    doctor: { degreeDetails: [], experience:"0" }
  };

  showDegreeForm = () => {
    this.setState({
      degreeFormVisible: true
    });
  };

  toggleDegreeForm = () =>
    this.setState({ degreeFormVisible: !this.state.degreeFormVisible });

  handleTextChange = e => {
    let doctor = this.state.doctor;
    if (e.target.name === "phone") {
      doctor[e.target.name] = Number(e.target.value);
    } else {
      doctor[e.target.name] = e.target.value;
    }
    this.setState({ doctor });
  };

  handleDateChange = (date, dateString) => {
    const doctor = this.state.doctor;
    doctor["dob"] = moment(date).toISOString();
    this.setState({ doctor });
  };

  handleSubmit = () => {
    let doctor = this.state.doctor;
    doctor.degree = doctor.degreeDetails;
    delete doctor.degrees;
    delete doctor.degreeDetails;
    delete doctor.doctorDetail;
    delete doctor.key;
    delete doctor.fullName;
    delete doctor.name;
    doctor.experience = Number(doctor.experience.split(" ")[0])
    console.log(doctor);

    if (this.props.mode === "new") {
      Axios.post(
        REGISTER_DOCTOR,
        {
          ...doctor,
          userType: "doctor",
          id: doctor.id
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => {
          message.success("Doctor created successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
      Axios.put(
        PUT_PATIENTS_URL,
        {
          ...doctor,
          userType: "doctor",
          detailId: this.state.doctor.detailId,
          id: doctor.id
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => {
          message.success("Doctor updated successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ doctor: props.entry });
    }
  }

  editDegreeDetails(e, index) {
    console.log(e.target.name, e.target.value, index);
    let doctor = this.state.doctor;
    let degrees = doctor.degreeDetails;
    degrees[index][e.target.name] = e.target.value;
    doctor["degreeDetails"] = degrees;
    this.setState({ doctor });
  }

  removeDegree(index) {
    let doctor = this.state.doctor;
    if (window.confirm("Are you sure?")) {
      doctor.degreeDetails.splice(index, 1);
      this.setState({ doctor });
    }
  }

  handleDegreeTextChange = e => {
    let degree = this.state.degree;
    degree[e.target.name] = e.target.value;
    this.setState({ degree });
  };

  handleAddDegree = degree => {
    if (!!this.state.doctor) {
      let doctor = this.state.doctor;
      doctor.degreeDetails = [...doctor.degreeDetails, degree];
      console.log(doctor);
      this.setState({ doctor: doctor, degree: {}, degreeFormVisible: false });
    } else {
      let doctor = { degreeDetails: [] };
      doctor.degreeDetails.push(degree);
      console.log(doctor);
      this.setState({ doctor: doctor, degree: {}, degreeFormVisible: false });
    }
    console.log(this.state.doctor);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer
            title="Add a new doctor account"
            width={720}
            onClose={hideForm}
            visible={visible}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("firstName", {
                      rules: [
                        { required: true, message: "Please enter first name" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter first name"
                        onChange={this.handleTextChange}
                        name="firstName"
                        value={this.state.doctor.firstName}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastName", {
                      rules: [
                        { required: true, message: "Please enter last name" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter last name"
                        onChange={this.handleTextChange}
                        name="lastName"
                        value={this.state.doctor.lastName}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Please enter email" }]
                    })(
                      <Input
                        placeholder="Please enter email"
                        onChange={this.handleTextChange}
                        name="email"
                        value={this.state.doctor.email}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Speciality">
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose a speciality"
                        }
                      ]
                    })(
                      <Select
                        placeholder="Please choose the type"
                        value={this.state.doctor.speciality}
                        onChange={value =>
                          this.handleTextChange({
                            target: {
                              name: "speciality",
                              value: value
                            }
                          })
                        }
                      >
                        <Select.Option value="Accident and emergency medicine">
                          Accident and emergency medicine
                        </Select.Option>
                        <Select.Option value="Allergology">
                          Allergology
                        </Select.Option>
                        <Select.Option value="Anaesthetics">
                          Anaesthetics
                        </Select.Option>
                        <Select.Option value="Cardiology">
                          Cardiology
                        </Select.Option>
                        <Select.Option value="Child psychiatry">
                          Child psychiatry
                        </Select.Option>
                        <Select.Option value="Clinical biology">
                          Clinical biology
                        </Select.Option>
                        <Select.Option value="Clinical chemistry">
                          Clinical chemistry
                        </Select.Option>
                        <Select.Option value="Clinical neurophysiology">
                          Clinical neurophysiology
                        </Select.Option>
                        <Select.Option value="Craniofacial surgery">
                          Craniofacial surgery
                        </Select.Option>
                        <Select.Option value="Dermatology">
                          Dermatology
                        </Select.Option>
                        <Select.Option value="Endocrinology">
                          Endocrinology
                        </Select.Option>
                        <Select.Option value="Family and General Medicine">
                          Family and General Medicine
                        </Select.Option>
                        <Select.Option value="Gastroenterologic surgery">
                          Gastroenterologic surgery
                        </Select.Option>
                        <Select.Option value="Gastroenterology">
                          Gastroenterology
                        </Select.Option>
                        <Select.Option value="General Practice">
                          General Practice
                        </Select.Option>
                        <Select.Option value="General surgery">
                          General surgery
                        </Select.Option>
                        <Select.Option value="Geriatrics">
                          Geriatrics
                        </Select.Option>
                        <Select.Option value="Hematology">
                          Hematology
                        </Select.Option>
                        <Select.Option value="Immunology">
                          Immunology
                        </Select.Option>
                        <Select.Option value="Infectious diseases">
                          Infectious diseases
                        </Select.Option>
                        <Select.Option value="Internal medicine">
                          Internal medicine
                        </Select.Option>
                        <Select.Option value="Laboratory medicine">
                          Laboratory medicine
                        </Select.Option>
                        <Select.Option value="Microbiology">
                          Microbiology
                        </Select.Option>
                        <Select.Option value="Nephrology">
                          Nephrology
                        </Select.Option>
                        <Select.Option value="Neuropsychiatry">
                          Neuropsychiatry
                        </Select.Option>
                        <Select.Option value="Neurology">
                          Neurology
                        </Select.Option>
                        <Select.Option value="Neurosurgery">
                          Neurosurgery
                        </Select.Option>
                        <Select.Option value="Nuclear medicine">
                          Nuclear medicine
                        </Select.Option>
                        <Select.Option value="Obstetrics and gynaecology">
                          Obstetrics and gynaecology
                        </Select.Option>
                        <Select.Option value="Occupational medicine">
                          Occupational medicine
                        </Select.Option>
                        <Select.Option value="Ophthalmology">
                          Ophthalmology
                        </Select.Option>
                        <Select.Option value="Oral and maxillofacial surgery">
                          Oral and maxillofacial surgery
                        </Select.Option>
                        <Select.Option value="Orthopaedics">
                          Orthopaedics
                        </Select.Option>
                        <Select.Option value="Otorhinolaryngology">
                          Otorhinolaryngology
                        </Select.Option>
                        <Select.Option value="Paediatric surgery">
                          Paediatric surgery
                        </Select.Option>
                        <Select.Option value="Paediatrics">
                          Paediatrics
                        </Select.Option>
                        <Select.Option value="Pathology">
                          Pathology
                        </Select.Option>
                        <Select.Option value="Pharmacology">
                          Pharmacology
                        </Select.Option>
                        <Select.Option value="Physical medicine and rehabilitation">
                          Physical medicine and rehabilitation
                        </Select.Option>
                        <Select.Option value="Plastic surgery">
                          Plastic surgery
                        </Select.Option>
                        <Select.Option value="Podiatric surgery">
                          Podiatric surgery
                        </Select.Option>
                        <Select.Option value="Preventive medicine">
                          Preventive medicine
                        </Select.Option>
                        <Select.Option value="Psychiatry">
                          Psychiatry
                        </Select.Option>
                        <Select.Option value="Public health">
                          Public health
                        </Select.Option>
                        <Select.Option value="Radiation Oncology">
                          Radiation Oncology
                        </Select.Option>
                        <Select.Option value="Radiology">
                          Radiology
                        </Select.Option>
                        <Select.Option value="Respiratory medicine">
                          Respiratory medicine
                        </Select.Option>
                        <Select.Option value="Rheumatology">
                          Rheumatology
                        </Select.Option>
                        <Select.Option value="Stomatology">
                          Stomatology
                        </Select.Option>
                        <Select.Option value="Thoracic surgery">
                          Thoracic surgery
                        </Select.Option>
                        <Select.Option value="Tropical medicine">
                          Tropical medicine
                        </Select.Option>
                        <Select.Option value="Urology">Urology</Select.Option>
                        <Select.Option value="Vascular surgery">
                          Vascular surgery
                        </Select.Option>
                        <Select.Option value="Venereology">
                          Venereology
                        </Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Password">
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Please enter password" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter password"
                        name="password"
                        onChange={this.handleTextChange}
                        value={this.state.doctor.password || null}
                        type="password"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone">
                    {getFieldDecorator("phone", {
                      rules: [{ required: true, message: "Please enter phone" }]
                    })(
                      <Input
                        placeholder="Please enter phone number"
                        name="phone"
                        onChange={this.handleTextChange}
                        value={this.state.doctor.phone || null}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Affiliation">
                    {getFieldDecorator("affiliation", {
                      rules: [
                        { required: true, message: "Please enter affiliation" }
                      ]
                    })(
                      <Input
                        placeholder="University affiliation"
                        onChange={this.handleTextChange}
                        name="affiliation"
                        value={this.state.doctor.affiliation}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Experience">
                    {getFieldDecorator("experience", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter experience (in years)"
                        }
                      ]
                    })(
                      <Input
                        placeholder="University affiliation"
                        onChange={this.handleTextChange}
                        name="experience"
                        value={this.state.doctor.experience}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Degrees">
                    <Button
                      style={{ width: "100%" }}
                      onClick={this.toggleDegreeForm}
                    >
                      Add Degrees
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              {this.state.doctor &&
                this.state.doctor.degreeDetails.map((degree, index) => {
                  return (
                    <Row gutter={16} style={{ marginTop: 10 }}>
                      <Col span={7}>
                        <Input
                          value={degree.id}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="id"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          value={degree.year}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="year"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          value={degree.name}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="name"
                        />
                      </Col>
                      <Col span={3}>
                        <Button
                          type="danger"
                          onClick={() => this.removeDegree(index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button onClick={hideForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
          <Drawer
            title={`Edit details ${this.state.doctor &&
              this.state.doctor.name}`}
            width={720}
            onClose={hideForm}
            visible={visible}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      placeholder="Please enter first name"
                      value={this.state.doctor && this.state.doctor.firstName}
                      name="firstName"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      placeholder="Please enter last name"
                      value={this.state.doctor && this.state.doctor.lastName}
                      name="lastName"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Please enter email"
                      value={this.state.doctor && this.state.doctor.email}
                      name="email"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Speciality">
                    <Select
                      placeholder="Please choose the type"
                      value={this.state.doctor && this.state.doctor.speciality}
                      onChange={value =>
                        this.handleTextChange({
                          target: {
                            name: "speciality",
                            value: value
                          }
                        })
                      }
                    >
                      <Select.Option value="Accident and emergency medicine">
                        Accident and emergency medicine
                      </Select.Option>
                      <Select.Option value="Allergology">
                        Allergology
                      </Select.Option>
                      <Select.Option value="Anaesthetics">
                        Anaesthetics
                      </Select.Option>
                      <Select.Option value="Cardiology">
                        Cardiology
                      </Select.Option>
                      <Select.Option value="Child psychiatry">
                        Child psychiatry
                      </Select.Option>
                      <Select.Option value="Clinical biology">
                        Clinical biology
                      </Select.Option>
                      <Select.Option value="Clinical chemistry">
                        Clinical chemistry
                      </Select.Option>
                      <Select.Option value="Clinical neurophysiology">
                        Clinical neurophysiology
                      </Select.Option>
                      <Select.Option value="Craniofacial surgery">
                        Craniofacial surgery
                      </Select.Option>
                      <Select.Option value="Dermatology">
                        Dermatology
                      </Select.Option>
                      <Select.Option value="Endocrinology">
                        Endocrinology
                      </Select.Option>
                      <Select.Option value="Family and General Medicine">
                        Family and General Medicine
                      </Select.Option>
                      <Select.Option value="Gastroenterologic surgery">
                        Gastroenterologic surgery
                      </Select.Option>
                      <Select.Option value="Gastroenterology">
                        Gastroenterology
                      </Select.Option>
                      <Select.Option value="General Practice">
                        General Practice
                      </Select.Option>
                      <Select.Option value="General surgery">
                        General surgery
                      </Select.Option>
                      <Select.Option value="Geriatrics">
                        Geriatrics
                      </Select.Option>
                      <Select.Option value="Hematology">
                        Hematology
                      </Select.Option>
                      <Select.Option value="Immunology">
                        Immunology
                      </Select.Option>
                      <Select.Option value="Infectious diseases">
                        Infectious diseases
                      </Select.Option>
                      <Select.Option value="Internal medicine">
                        Internal medicine
                      </Select.Option>
                      <Select.Option value="Laboratory medicine">
                        Laboratory medicine
                      </Select.Option>
                      <Select.Option value="Microbiology">
                        Microbiology
                      </Select.Option>
                      <Select.Option value="Nephrology">
                        Nephrology
                      </Select.Option>
                      <Select.Option value="Neuropsychiatry">
                        Neuropsychiatry
                      </Select.Option>
                      <Select.Option value="Neurology">Neurology</Select.Option>
                      <Select.Option value="Neurosurgery">
                        Neurosurgery
                      </Select.Option>
                      <Select.Option value="Nuclear medicine">
                        Nuclear medicine
                      </Select.Option>
                      <Select.Option value="Obstetrics and gynaecology">
                        Obstetrics and gynaecology
                      </Select.Option>
                      <Select.Option value="Occupational medicine">
                        Occupational medicine
                      </Select.Option>
                      <Select.Option value="Ophthalmology">
                        Ophthalmology
                      </Select.Option>
                      <Select.Option value="Oral and maxillofacial surgery">
                        Oral and maxillofacial surgery
                      </Select.Option>
                      <Select.Option value="Orthopaedics">
                        Orthopaedics
                      </Select.Option>
                      <Select.Option value="Otorhinolaryngology">
                        Otorhinolaryngology
                      </Select.Option>
                      <Select.Option value="Paediatric surgery">
                        Paediatric surgery
                      </Select.Option>
                      <Select.Option value="Paediatrics">
                        Paediatrics
                      </Select.Option>
                      <Select.Option value="Pathology">Pathology</Select.Option>
                      <Select.Option value="Pharmacology">
                        Pharmacology
                      </Select.Option>
                      <Select.Option value="Physical medicine and rehabilitation">
                        Physical medicine and rehabilitation
                      </Select.Option>
                      <Select.Option value="Plastic surgery">
                        Plastic surgery
                      </Select.Option>
                      <Select.Option value="Podiatric surgery">
                        Podiatric surgery
                      </Select.Option>
                      <Select.Option value="Preventive medicine">
                        Preventive medicine
                      </Select.Option>
                      <Select.Option value="Psychiatry">
                        Psychiatry
                      </Select.Option>
                      <Select.Option value="Public health">
                        Public health
                      </Select.Option>
                      <Select.Option value="Radiation Oncology">
                        Radiation Oncology
                      </Select.Option>
                      <Select.Option value="Radiology">Radiology</Select.Option>
                      <Select.Option value="Respiratory medicine">
                        Respiratory medicine
                      </Select.Option>
                      <Select.Option value="Rheumatology">
                        Rheumatology
                      </Select.Option>
                      <Select.Option value="Stomatology">
                        Stomatology
                      </Select.Option>
                      <Select.Option value="Thoracic surgery">
                        Thoracic surgery
                      </Select.Option>
                      <Select.Option value="Tropical medicine">
                        Tropical medicine
                      </Select.Option>
                      <Select.Option value="Urology">Urology</Select.Option>
                      <Select.Option value="Vascular surgery">
                        Vascular surgery
                      </Select.Option>
                      <Select.Option value="Venereology">
                        Venereology
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Affiliation">
                    <Input
                      placeholder="University affiliation"
                      value={this.state.doctor && this.state.doctor.affiliation}
                      name="affiliation"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Experience">
                    <Input
                      placeholder="Experience"
                      value={this.state.doctor && this.state.doctor.experience}
                      name="experience"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Phone">
                    <Input
                      placeholder="Phone"
                      value={this.state.doctor && this.state.doctor.phone}
                      name="phone"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Degrees">
                    <Button
                      style={{ width: "100%" }}
                      onClick={this.toggleDegreeForm}
                    >
                      Add Degrees
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              {this.state.doctor &&
                this.state.doctor.degreeDetails.map((degree, index) => {
                  return (
                    <Row gutter={16} style={{ marginTop: 10 }}>
                      <Col span={7}>
                        <Input
                          value={degree.id}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="id"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          value={degree.year}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="year"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          value={degree.name}
                          onChange={e => this.editDegreeDetails(e, index)}
                          name="name"
                        />
                      </Col>
                      <Col span={3}>
                        <Button
                          type="danger"
                          onClick={() => this.removeDegree(index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button onClick={hideForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        )}
        <Drawer
          title="Add Degree"
          width={720}
          onClose={this.toggleDegreeForm}
          visible={this.state.degreeFormVisible}
        >
          <Input
            placeholder="Degree ID"
            onChange={this.handleDegreeTextChange}
            name="id"
            value={this.state.degree.id}
          />
          <br />
          <br />
          <Input
            placeholder="Degree Year"
            onChange={this.handleDegreeTextChange}
            name="year"
            value={this.state.degree.year}
          />
          <br />
          <br />
          <Input
            placeholder="Degree Name"
            onChange={this.handleDegreeTextChange}
            name="name"
            value={this.state.degree.name}
          />
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => this.handleAddDegree(this.state.degree)}
          >
            Add Degree
          </Button>
        </Drawer>
      </div>
    );
  }
}

const DoctorForm = Form.create()(DoctorFormRaw);
export default DoctorForm;
