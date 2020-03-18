import "../assets/styles/sign-in.css";
import React, { Component } from "react";
import { Input, Button, Icon, message, Form, Table, DatePicker, Modal, Upload, Select } from "antd";
import axios from "axios";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import authService from "../services/auth";
import ModalDefault from "../components/ModalDefault";
const { confirm } = Modal;

const uploadButton = (
  <div>
    <Icon type={"camera"} />
    <div className="ant-upload-text">Profile Picture</div>
  </div>
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: null,
      password: null,
      degrees: [],
      degree: {},
      showEditModal: false,
      degreeToEdit: {},
      deleting: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEditTextChange = this.handleEditTextChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.addDegree = this.addDegree.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.deleteDegree = this.deleteDegree.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.selectSpeciality = this.selectSpeciality.bind(this);
  }

  selectSpeciality(value) {
    this.setState({ speciality: value });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }

  async handleSubmit() {
    this.toggleLoading();
    const data = { ...this.state };
    delete data.loading;
    delete data.degree;
    data.degree = data.degrees;
    const response = await authService.signUp(data);
    if (response.status === 0) {
      message.error(response.response);
    } else {
      message.success(response.response);
      this.props.history.push("/");
    }
    this.toggleLoading();
  }

  deleteDegree(index) {
    const newDegrees = this.state.degrees;
    newDegrees.splice(index, 1);
    this.setState({
      degrees: newDegrees,
      deleting: false,
      showEditModal: false
    });
  }

  showDeleteConfirm(index, deleteDegree = this.deleteDegree) {
    this.setState({ deleting: true });
    confirm({
      title: "Are you sure delete this degree?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteDegree(index);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditTextChange(e) {
    let degreeToEdit = this.state.degreeToEdit;
    degreeToEdit[e.target.name] = e.target.value;
    this.setState({ degreeToEdit: degreeToEdit });
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  showEditModal(index) {
    this.setState({
      showEditModal: true,
      degreeToEdit: this.state.degrees[index],
      degreeIndex: index
    });
  }

  addDegree() {
    let degrees = [...this.state.degrees];
    degrees.push(this.state.degree);
    this.setState({
      degrees,
      degree: {}
    });

    this.hideModal();
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  hideEditModal() {
    this.setState({ showEditModal: false });
  }

  handleDegreeChange(e) {
    let degree = { ...this.state.degree };
    degree[e.target.name] = e.target.value;
    this.setState({
      degree
    });
  }

  handleDOB(date) {
    this.setState({
      dateOfBirth: date.toString()
    });
  }

  handleUpload(info) {
    if (this.state.profileImage) {
      this.handleRemove();
    }
    if (info.file.response) {
      this.setState({ profileImage: info.file.response.response });
    }
  }

  handleRemove() {
    axios
      .delete(`https://api.seershome.com/api/v1/delete-profile-image?url=${this.state.profileImage}`)
      .then(res => this.setState({ profileImage: null }))
      .catch(err => console.log(err));
  }

  render() {
    const { loading, degrees } = this.state;
    return (
      <div className="signin">
        <div className="hero" />
        <div className="form-container padding50">
          <div style={{ width: "500px" }} className="form animated fadeIn">
            <img src={logo} alt="Mobicare+ Home" />
            <h2>Sign up to create a Mobicare doctor account</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", width: "100%" }}>
              <div>
                <Upload
                  name="profileimage"
                  action="https://api.seershome.com/api/v1/upload-profile-image"
                  listType="picture"
                  onChange={info => this.handleUpload(info)}
                  style={{ textAlign: "center" }}
                  multiple={false}
                  onRemove={this.handleRemove}
                  listType="picture-card"
                  showUploadList={false}
                >
                  {this.state.profileImage ? (
                    <img src={this.state.profileImage} alt="avatar" style={{ width: "100%" }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div>
                <Input
                  placeholder="First Name"
                  suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  size="large"
                  name="firstName"
                  style={{ marginBottom: "22px" }}
                  onChange={this.handleTextChange}
                />
                <Input
                  placeholder="Last Name"
                  suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  size="large"
                  name="lastName"
                  onChange={this.handleTextChange}
                />
              </div>
            </div>
            <Input
              placeholder="Email"
              suffix={<Icon type="inbox" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="email"
              onChange={this.handleTextChange}
            />
            <Input
              placeholder="Password"
              suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              type="password"
              name="password"
              onChange={this.handleTextChange}
            />
            <Input
              placeholder="Confirm Password"
              size="large"
              type="password"
              name="confirmPassword"
              onChange={this.handleTextChange}
              suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
            <DatePicker placeholder="Date of Birth" size="large" onChange={this.handleDOB} />
            <Input
              placeholder="Address"
              suffix={<Icon type="align-left" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="address"
              onChange={this.handleTextChange}
            />
            <Input
              placeholder="Phone Number"
              suffix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="phone"
              onChange={this.handleTextChange}
            />

            <Button onClick={this.showModal} type="dashed" size="large">
              Add Degrees ({degrees.length} added)
            </Button>
            {this.state.degrees.length > 0 && (
              <Table
                size="small"
                dataSource={this.state.degrees}
                pagination={false}
                style={{ textAlign: "center" }}
                onRowClick={(a, index, b) => this.showEditModal(index)}
              >
                <Table.Column title="Id" dataIndex="id" key="id" />
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column title="Year" dataIndex="year" key="year" />
              </Table>
            )}
            <Select placeholder="Speciality" onChange={this.selectSpeciality} size="large">
              <Select.Option value="Accident and emergency medicine">Accident and emergency medicine</Select.Option>
              <Select.Option value="Allergology">Allergology</Select.Option>
              <Select.Option value="Anaesthetics">Anaesthetics</Select.Option>
              <Select.Option value="Cardiology">Cardiology</Select.Option>
              <Select.Option value="Child psychiatry">Child psychiatry</Select.Option>
              <Select.Option value="Clinical biology">Clinical biology</Select.Option>
              <Select.Option value="Clinical chemistry">Clinical chemistry</Select.Option>
              <Select.Option value="Clinical neurophysiology">Clinical neurophysiology</Select.Option>
              <Select.Option value="Craniofacial surgery">Craniofacial surgery</Select.Option>
              <Select.Option value="Dermatology">Dermatology</Select.Option>
              <Select.Option value="Endocrinology">Endocrinology</Select.Option>
              <Select.Option value="Family and General Medicine">Family and General Medicine</Select.Option>
              <Select.Option value="Gastroenterologic surgery">Gastroenterologic surgery</Select.Option>
              <Select.Option value="Gastroenterology">Gastroenterology</Select.Option>
              <Select.Option value="General Practice">General Practice</Select.Option>
              <Select.Option value="General surgery">General surgery</Select.Option>
              <Select.Option value="Geriatrics">Geriatrics</Select.Option>
              <Select.Option value="Hematology">Hematology</Select.Option>
              <Select.Option value="Immunology">Immunology</Select.Option>
              <Select.Option value="Infectious diseases">Infectious diseases</Select.Option>
              <Select.Option value="Internal medicine">Internal medicine</Select.Option>
              <Select.Option value="Laboratory medicine">Laboratory medicine</Select.Option>
              <Select.Option value="Microbiology">Microbiology</Select.Option>
              <Select.Option value="Nephrology">Nephrology</Select.Option>
              <Select.Option value="Neuropsychiatry">Neuropsychiatry</Select.Option>
              <Select.Option value="Neurology">Neurology</Select.Option>
              <Select.Option value="Neurosurgery">Neurosurgery</Select.Option>
              <Select.Option value="Nuclear medicine">Nuclear medicine</Select.Option>
              <Select.Option value="Obstetrics and gynaecology">Obstetrics and gynaecology</Select.Option>
              <Select.Option value="Occupational medicine">Occupational medicine</Select.Option>
              <Select.Option value="Ophthalmology">Ophthalmology</Select.Option>
              <Select.Option value="Oral and maxillofacial surgery">Oral and maxillofacial surgery</Select.Option>
              <Select.Option value="Orthopaedics">Orthopaedics</Select.Option>
              <Select.Option value="Otorhinolaryngology">Otorhinolaryngology</Select.Option>
              <Select.Option value="Paediatric surgery">Paediatric surgery</Select.Option>
              <Select.Option value="Paediatrics">Paediatrics</Select.Option>
              <Select.Option value="Pathology">Pathology</Select.Option>
              <Select.Option value="Pharmacology">Pharmacology</Select.Option>
              <Select.Option value="Physical medicine and rehabilitation">Physical medicine and rehabilitation</Select.Option>
              <Select.Option value="Plastic surgery">Plastic surgery</Select.Option>
              <Select.Option value="Podiatric surgery">Podiatric surgery</Select.Option>
              <Select.Option value="Preventive medicine">Preventive medicine</Select.Option>
              <Select.Option value="Psychiatry">Psychiatry</Select.Option>
              <Select.Option value="Public health">Public health</Select.Option>
              <Select.Option value="Radiation Oncology">Radiation Oncology</Select.Option>
              <Select.Option value="Radiology">Radiology</Select.Option>
              <Select.Option value="Respiratory medicine">Respiratory medicine</Select.Option>
              <Select.Option value="Rheumatology">Rheumatology</Select.Option>
              <Select.Option value="Stomatology">Stomatology</Select.Option>
              <Select.Option value="Thoracic surgery">Thoracic surgery</Select.Option>
              <Select.Option value="Tropical medicine">Tropical medicine</Select.Option>
              <Select.Option value="Urology">Urology</Select.Option>
              <Select.Option value="Vascular surgery">Vascular surgery</Select.Option>
              <Select.Option value="Venereology">Venereology</Select.Option>
            </Select>
            <Input
              placeholder="Experience"
              suffix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="experience"
              onChange={this.handleTextChange}
            />
            <Input
              placeholder="Affiliation"
              suffix={<Icon type="audit" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="affiliation"
              onChange={this.handleTextChange}
            />
            <Button type="primary" icon="plus" size="large" loading={loading} onClick={this.handleSubmit}>
              Create Account
            </Button>
            <Button type="link" size="large">
              <Link to="/">I already have an account</Link>
            </Button>
          </div>
        </div>
        <ModalDefault
          title="Add Degree"
          clickConfirm={this.addDegree}
          clickCancel={this.hideModal}
          visible={this.state.showModal}
          footer={[
            <Button key="submit" onClick={() => this.hideModal()} style={{ float: "left", marginLeft: "7px" }} size="small">
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.addDegree} size="small" style={{ marginRight: "7px" }}>
              Add
            </Button>
          ]}
        >
          <Input
            name="id"
            className="sign-up-modal"
            placeholder="Enter ID"
            value={this.state.degree.id}
            onChange={this.handleDegreeChange}
          />
          <Input
            name="name"
            className="sign-up-modal"
            placeholder="Enter Name"
            value={this.state.degree.name}
            onChange={this.handleDegreeChange}
          />
          <Input
            name="year"
            className="sign-up-modal"
            placeholder="Enter Year"
            value={this.state.degree.year}
            onChange={this.handleDegreeChange}
          />
        </ModalDefault>

        <ModalDefault
          title="Add Degree"
          clickConfirm={this.addDegree}
          clickCancel={this.hideEditModal}
          visible={this.state.showEditModal}
          footer={[
            <Button
              key="submit"
              type="danger"
              onClick={() => this.showDeleteConfirm(this.state.degreeIndex)}
              style={{ float: "left", marginLeft: "7px" }}
              size="small"
            >
              Delete
            </Button>,
            <Button key="submit" type="primary" onClick={this.hideEditModal} size="small" style={{ marginRight: "7px" }}>
              Done
            </Button>
          ]}
        >
          <Input
            name="id"
            className="sign-up-modal"
            placeholder="Enter ID"
            value={this.state.degreeToEdit.id}
            onChange={this.handleEditTextChange}
          />
          <Input
            name="name"
            className="sign-up-modal"
            placeholder="Enter Name"
            value={this.state.degreeToEdit.name}
            onChange={this.handleEditTextChange}
          />
          <Input
            name="year"
            className="sign-up-modal"
            placeholder="Enter Year"
            value={this.state.degreeToEdit.year}
            onChange={this.handleEditTextChange}
          />
        </ModalDefault>
      </div>
    );
  }
}

export default Form.create({ name: "signUpForm" })(SignUp);
