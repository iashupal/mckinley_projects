import React, { Component } from "react";
import { Row, Col, Card, Button } from "antd";
import UserCard from "../../components/UserCard/UserCard";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchText: "",
      formVisible: false
    };
    this.showEditForm = this.showEditForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  showForm() {
    this.setState({
      formVisible: true,
      mode: "new"
    });
  }

  hideForm() {
    this.setState({
      formVisible: false
    });
  }
  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

  render() {
    const { formVisible, mode, entry } = this.state;
    return (
      <div>
        <Card title="MyProfile">
          <Row>
            <Col>
              <UserCard
                // imageURL="http://mblogthumb2.phinf.naver.net/MjAxNzA4MTRfMTcg/MDAxNTAyNjQyOTI0OTEw.mersDZq0nKkXxtzz6_2WsxOT33hK0ZTyr9qu4kIBmZgg.eM_YGPVoXu7HU66f9szXzAQ9Vv63RyHujRDLwYg59LAg.JPEG.grace4088/IMG_20170812_130733.jpg?type=w800"
                username="Felix"
                email="email@email.com"
                age="26 years"
                status="single"
                education="Graduate"
                company="Mckinley & Rice"
                pNumber="1234567890"
                address="Delhi"
              />
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                onClick={() => this.showEditForm()}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card>
        <ProfileForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default Profile;
