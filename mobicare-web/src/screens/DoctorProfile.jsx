import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Row, Col, Button, Input, Typography, Upload, Icon, Tag } from "antd";
import patientService from "../services/patients";
import Loader from "../components/Loader";
import ButtonGroup from "antd/lib/button/button-group";
import Axios from "axios";
import moment from "moment";
import "../assets/styles/doctor-profile.css";
import doctor_profile1 from "../assets/images/doctor_profile1.png";

const { Title } = Typography;
const uploadButton = (
  <div>
    <Icon type={"camera"} />
    <div className="ant-upload-text">Profile Picture</div>
  </div>
);

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      loading: false,
      editing: false,
      personalEdit: false
    };
  }
  async componentDidMount() {
    this.toggleLoading();
    const profile = await patientService.getPatientDetail(
      jwt_decode(localStorage.getItem("token")).userId
    );
    this.setState({
      user: profile.response[0],
      profileImage: profile.response[0].profileImage,
      firstName: profile.response[0].firstName,
      lastName: profile.response[0].lastName,
      address: profile.response[0].address,
      experience: profile.response[0].experience,
      affiliation: profile.response[0].affiliation,
      phone: profile.response[0].phone,
      speciality: profile.response[0].speciality,
      detailId: profile.response[0].doctorDetail[0]._id
    });
    this.toggleLoading();
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading });
  toggleEditing = (submiting = false) => {
    if (submiting) {
      console.log(
        this.state.profileImage,
        this.state.firstName,
        this.state.lastName
      );
      Axios.put(
        "https://api.seershome.com/api/v1/user",
        {
          profileImage: this.state.profileImage,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          id: jwt_decode(localStorage.getItem("token")).userId,
          userType: "doctor",
          detailId: this.state.detailId
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => {})
        .catch(err => console.log(err));
    } else {
      this.setState({ editing: !this.state.editing });
    }
  };
  togglePersonalEdit = (submiting = false) => {
    if (submiting) {
      console.log(
        this.state.address,
        this.state.experience,
        this.state.affiliation,
        this.state.phone,
        this.state.speciality
      );
      Axios.put(
        "https://api.seershome.com/api/v1/user",
        {
          address: this.state.address,
          experience: this.state.experience,
          affiliation: this.state.affiliation,
          phone: this.state.phone,
          speciality: this.state.speciality,
          id: jwt_decode(localStorage.getItem("token")).userId,
          userType: "doctor",
          detailId: this.state.detailId
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => window.location.reload())
        .catch(err => console.log(err));
    } else {
      this.setState({ personalEdit: !this.state.personalEdit });
    }
  };

  handleUpload = info => {
    if (this.state.profileImage) {
      this.handleRemove();
    }
    if (info.file.response) {
      this.setState({ profileImage: info.file.response.response });
    }
  };

  handleRemove = () => {
    Axios.delete(
      `https://api.seershome.com/api/v1/delete-profile-image?url=${this.state.profileImage}`
    )
      .then(res => this.setState({ profileImage: null }))
      .catch(err => console.log(err));
  };

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { profileImage, loading, user, editing, personalEdit } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <div>
          <Row className="content-wrapper">
            <Col span={24}>
              <img
                style={{ marginRight: "20px", width: "20px" }}
                src={doctor_profile1}
                alt="Doctor profile"
              />
              <div style={{ display: "inline-block" }}>
                <Title
                  type="secondary"
                  level={4}
                  style={{ color: "black", fontWeight: "500" }}
                >
                  Doctor Profile
                </Title>
              </div>
            </Col>
          </Row>
          <div
            className="profile doctor"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridGap: "10px 25px",
              gridTemplateColumns: "1fr 1fr"
            }}
          >
            <div>
              <div className="card-box">
                <div className="profile-box1">
                  <div
                    className="header"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 8fr 3fr",
                      gridGap: "10px"
                    }}
                  >
                    {editing ? (
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
                          <img
                            src={this.state.profileImage}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    ) : (
                      <div
                        style={{
                          backgroundImage: `url(${profileImage})`,
                          width: "100px",
                          height: "100px",
                          borderRadius: "100%",
                          backgroundSize: "cover"
                        }}
                      />
                    )}

                    <div>
                      <p style={{ marginBottom: 0, color: "black" }}>
                        {editing ? (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gridGap: "10px"
                            }}
                          >
                            <Input
                              value={user && user.firstName}
                              name="firstName"
                              onChange={this.handleTextChange}
                              value={this.state.firstName}
                            />
                            <Input
                              value={user && user.lastName}
                              name="lastName"
                              onChange={this.handleTextChange}
                              value={this.state.lastName}
                            />
                          </div>
                        ) : (
                          <b>
                            {user && user.firstName} {user && user.lastName}
                          </b>
                        )}
                      </p>
                      <p>{user && user.email}</p>
                    </div>
                    <div className="doctor_edit">
                      <ButtonGroup className="doctor_btn_grp">
                        <Button
                          className="doctor_edit_btn"
                          icon={editing ? "" : "setting"}
                          type="default"
                          onClick={
                            editing
                              ? () => this.toggleEditing(true)
                              : () => this.toggleEditing()
                          }
                        >
                          {editing ? "Done" : "Edit"}
                        </Button>
                        {editing && (
                          <Button
                            className="doctor_edit_btn"
                            // icon="cross"
                            style={{ color: "#FF6464" }}
                            onClick={() => this.toggleEditing()}
                          >
                            Cancel
                          </Button>
                        )}
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-box">
                <div className="profile-box1">
                  <h2 style={{ fontSize: "18px" }}>mobicare Details</h2>
                  <br />
                  <p>
                    mobiCARE +Home User ID :{" "}
                    <b style={{ color: "black" }}>{user && user._id}</b>
                  </p>
                  <p>
                    Joined On :{" "}
                    <b>
                      {user &&
                        moment(user.createdAt).format(
                          "dddd , YYYY-MM-DD, hh:mm a"
                        )}
                    </b>
                  </p>
                  <p>
                    <b>Account Status: </b>
                    {user && user.isConfirmed ? (
                      <Tag color="#0CBDA3" style={{ fontWeight: "bold" }}>
                        CONFIRMED
                      </Tag>
                    ) : (
                      <Tag color="red" style={{ fontWeight: "bold" }}>
                        PENDING
                      </Tag>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-box">
              <div className="profile-box1">
                <div className="doctor_personalDetail">
                  <div>
                    <h2 style={{ fontSize: "18px" }}>Personal Details</h2>
                    <br />
                    {!personalEdit ? (
                      <p>
                        Address : <b>{user && user.doctorDetail[0].address}</b>
                      </p>
                    ) : (
                      <div className="doctor_personalInfo">
                        <p>Address</p>
                        <Input
                          value={user && user.doctorDetail[0].address}
                          name="address"
                          onChange={this.handleTextChange}
                          value={this.state.address}
                        />
                      </div>
                    )}
                    {!personalEdit ? (
                      <p>
                        Experience :{" "}
                        <b>{user && user.doctorDetail[0].experience}</b>
                      </p>
                    ) : (
                      <div className="doctor_personalInfo">
                        <p>Experience</p>
                        <Input
                          value={user && user.doctorDetail[0].experience}
                          name="experience"
                          onChange={this.handleTextChange}
                          value={this.state.experience}
                        />
                      </div>
                    )}
                    {!personalEdit ? (
                      <p>
                        Affiliation :{" "}
                        <b>{user && user.doctorDetail[0].affiliation}</b>
                      </p>
                    ) : (
                      <div className="doctor_personalInfo">
                        <p>Affiliation</p>
                        <Input
                          value={user && user.doctorDetail[0].affiliation}
                          name="affiliation"
                          onChange={this.handleTextChange}
                          value={this.state.affiliation}
                        />
                      </div>
                    )}

                    <p>
                      Degrees :
                      <br />
                      <b>
                        {user &&
                          user.doctorDetail[0].degree.map(d => (
                            <p>
                              {d.id} - {d.year} - {d.name}
                            </p>
                          ))}
                      </b>
                    </p>
                    {!personalEdit ? (
                      <p>
                        Phone : <b>{user && user.doctorDetail[0].phone}</b>
                      </p>
                    ) : (
                      <div className="doctor_personalInfo">
                        <p>Phone</p>
                        <Input
                          value={user && user.doctorDetail[0].phone}
                          name="phone"
                          onChange={this.handleTextChange}
                          value={this.state.phone}
                        />
                      </div>
                    )}
                    {!personalEdit ? (
                      <p>
                        Speciality :{" "}
                        <b>{user && user.doctorDetail[0].speciality}</b>
                      </p>
                    ) : (
                      <div className="doctor_personalInfo">
                        <p>Speciality</p>
                        <Input
                          value={user && user.doctorDetail[0].speciality}
                          name="speciality"
                          onChange={this.handleTextChange}
                          value={this.state.speciality}
                        />
                      </div>
                    )}
                  </div>
                  <div className="doctor_edit">
                    <ButtonGroup className="doctor_btn_grp">
                      <Button
                        className="doctor_edit_btn"
                        icon={personalEdit ? "" : "setting"}
                        type="default"
                        onClick={
                          personalEdit
                            ? () => this.togglePersonalEdit(true)
                            : () => this.togglePersonalEdit()
                        }
                      >
                        {personalEdit ? "Done" : "Edit"}
                      </Button>
                      {personalEdit && (
                        <Button
                          className="doctor_edit_btn"
                          // icon="cross"
                          style={{ color: "#FF6464" }}
                          onClick={() => this.togglePersonalEdit()}
                        >
                          Cancel
                        </Button>
                      )}
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DoctorProfile;
