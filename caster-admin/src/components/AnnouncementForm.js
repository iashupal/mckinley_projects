import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import { PUT_ANNOUNCEMENT_URL, POST_ANNOUNCEMENT_URL } from "../utils/endpoints";
import axios from "axios";

class AnnouncementFormRaw extends Component {
  state = {
    visible: false,
    announcement: {}
  };

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  handleTextChange = e => {
    let announcement = this.state.announcement;
    if (e.target.name === "phone") {
      announcement[e.target.name] = Number(e.target.value);
    } else {
      announcement[e.target.name] = e.target.value;
    }
    this.setState({ announcement });
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let announcement = this.state.announcement;
    console.log(announcement);

    if (this.props.mode === "new") {
      axios
        .post(
          POST_ANNOUNCEMENT_URL,
          {
            ...announcement
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Announcement created successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
      console.log('jdjhafs->>>>', announcement);

      axios
        .put(
          PUT_ANNOUNCEMENT_URL + "?id=" + this.props.entry._id,
          {
            title: announcement.title,
            content: announcement.content
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Announcement updated successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ announcement: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new announcement" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Title">
                    {getFieldDecorator("title", {
                      rules: [{ required: true, message: "Please enter title" }]
                    })(
                      <Input
                        placeholder="Please enter title"
                        onChange={this.handleTextChange}
                        name="title"
                        value={this.state.announcement.title}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Content">
                    {getFieldDecorator("content", {
                      rules: [{ required: true, message: "Please enter content" }]
                    })(
                      <Input
                        placeholder="Please enter content"
                        onChange={this.handleTextChange}
                        name="content"
                        value={this.state.announcement.content}
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
              title={`편집하다 ${this.state.announcement.title}`}
              width={720}
              onClose={hideForm}
              visible={visible}
              entry={this.state.entry}
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="타이틀">
                      <Input
                        placeholder="들어가다 타이틀"
                        value={this.state.announcement.title}
                        name="title"
                        onChange={this.handleTextChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="함유량">
                      <Input
                        placeholder="들어가다 함유량"
                        value={this.state.announcement.content}
                        name="content"
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
                  취소
              </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  제출
              </Button>
              </div>
            </Drawer>
          )}
      </div>
    );
  }
}

const AnnouncementForm = Form.create()(AnnouncementFormRaw);
export default AnnouncementForm;
