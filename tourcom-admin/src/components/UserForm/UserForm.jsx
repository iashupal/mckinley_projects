import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, message } from "antd";
import moment from "moment";
// import { PUT_PATIENTS_URL, REGISTER_DOCTOR } from "../utils/endpoints";
import Axios from "axios";

const { Option } = Select;

class UserFormRaw extends Component {
    state = {
        visible: false,
    };

    handleTextChange = e => {
        let user = this.state.user;
        if (e.target.name === "phone") {
            user[e.target.name] = Number(e.target.value);
        } else {
            user[e.target.name] = e.target.value;
        }
        this.setState({ user });
    };

    handleDateChange = (date, dateString) => {
        const user = this.state.user;
        user["dob"] = moment(date).toISOString();
        this.setState({ user });
    };

    handleSubmit = () => {
        let user = this.state.user;
        delete user.doctorDetail;
        delete user.key;
        delete user.fullName;
        delete user.name;
        console.log(user);

        // if (this.props.mode === "new") {
        //     Axios.post(
        //         REGISTER_DOCTOR,
        //         {
        //             ...doctor,
        //             userType: "doctor",
        //             id: doctor.id
        //         },
        //         {
        //             headers: {
        //                 "x-access-token": localStorage.getItem("token")
        //             }
        //         }
        //     )
        //         .then(res => {
        //             message.success("Doctor created successfully!");
        //             window.location.reload();
        //         })
        //         .catch(err => {
        //             message.error(err.response.data.response);
        //         });
        // } else {
        //     Axios.put(
        //         PUT_PATIENTS_URL,
        //         {
        //             ...doctor,
        //             userType: "doctor",
        //             detailId: this.state.doctor.detailId,
        //             id: doctor.id
        //         },
        //         {
        //             headers: {
        //                 "x-access-token": localStorage.getItem("token")
        //             }
        //         }
        //     )
        //         .then(res => {
        //             message.success("Doctor updated successfully!");
        //             window.location.reload();
        //         })
        //         .catch(err => {
        //             message.error(err.response.data.response);
        //         });
        // }
    };

    componentWillReceiveProps(props) {
        if (props.mode === "edit") {
            this.setState({ user: props.entry });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, hideForm, mode } = this.props;
        return (
            <div>
                {mode === "new" ? (
                    <Drawer title="Add a new user account" width={720} onClose={hideForm} visible={visible}>
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="First Name">
                                        {getFieldDecorator("firstName", {
                                            rules: [{ required: true, message: "Please enter first name" }]
                                        })(
                                            <Input
                                                placeholder="Please enter first name"
                                                onChange={this.handleTextChange}
                                                name="firstName"
                                                // value={this.state.user.firstName}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Last Name">
                                        {getFieldDecorator("lastName", {
                                            rules: [{ required: true, message: "Please enter last name" }]
                                        })(
                                            <Input
                                                placeholder="Please enter last name"
                                                onChange={this.handleTextChange}
                                                name="lastName"
                                                // value={this.state.user.lastName}
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
                                                // value={this.state.user.email}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                
                                <Col span={12}>
                                    <Form.Item label="Password">
                                        {getFieldDecorator("password", {
                                            rules: [{ required: true, message: "Please enter password" }]
                                        })(
                                            <Input
                                                placeholder="Please enter password"
                                                name="password"
                                                onChange={this.handleTextChange}
                                                // value={this.state.user.password || null}
                                                type="password"
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Phone">
                                        {getFieldDecorator("phone", {
                                            rules: [{ required: true, message: "Please enter phone" }]
                                        })(
                                            <Input
                                                placeholder="Please enter phone number"
                                                name="phone"
                                                onChange={this.handleTextChange}
                                                // value={this.state.user.phone || null}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
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
                            title={`Edit details ${this.state.user && this.state.user.name}`}
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
                                                // value={this.state.user && this.state.user.firstName}
                                                name="firstName"
                                                onChange={this.handleTextChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Last Name">
                                            <Input
                                                placeholder="Please enter last name"
                                                // value={this.state.user && this.state.user.lastName}
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
                                                // value={this.state.user && this.state.user.email}
                                                name="email"
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
                                                // value={this.state.user && this.state.user.phone}
                                                name="phone"
                                                onChange={this.handleTextChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                
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
            </div>
        );
    }
}

const UserForm = Form.create()(UserFormRaw);
export default UserForm;
