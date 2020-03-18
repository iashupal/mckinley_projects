import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, Divider } from "antd";
import { PUT_BANNER_URL, POST_BANNER_URL } from "../utils/endpoints";
import axios from "axios";

class BannerFormRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      file: null,
      banner: {}
    };
    this.handlefileChange = this.handlefileChange.bind(this);
  }

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  handleTextChange = e => {
    let banner = this.state.banner;
    if (e.target.name === "phone") {
      banner[e.target.name] = Number(e.target.value);
    } else {
      banner[e.target.name] = e.target.value;
    }
    this.setState({ banner });
  };

  handlefileChange(e) {
    // let banner = this.state.banner;
    this.setState({ file: e.target.files[0] });
  }

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let banner = this.state.banner;
    var bannerId = this.props.entry;
    console.log("banner", banner);
    var formData = new FormData();
    formData.append("bannerImage", this.state.file);
    formData.append("url", banner.url);
    formData.append("clicks", banner.clicks);
    formData.append("id", banner._id);
    if (this.props.mode === "new") {
      console.log("file", this.state.file);
      console.log("id", bannerId);

      axios
        .post(POST_BANNER_URL, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          message.success("Banner created successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response);
        });
    } else {
      console.log("id", bannerId);
      axios
        .put(
          PUT_BANNER_URL,
          // {
          formData,
          // id: formData._id
          // },

          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          message.success("Banner updated successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ banner: props.entry });
      console.log('banner---->', props.entry)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new Banner" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Select image">
                    {getFieldDecorator("bannerImage", {
                      rules: [{ required: true, message: "Please select image" }]
                    })(
                      <Input
                        onChange={this.handlefileChange}
                        name="bannerImage"
                        type="file"
                      // value={this.state.banner.bannerImage}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Url">
                    {getFieldDecorator("url", {
                      rules: [{ required: true, message: "Please enter url" }]
                    })(
                      <Input
                        placeholder="Please enter url"
                        onChange={this.handleTextChange}
                        name="url"
                        value={this.state.banner.url}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Clicks">
                    {getFieldDecorator("clicks", {
                      rules: [{ required: true, message: "Please enter number of click" }]
                    })(
                      <Input
                        placeholder="Please enter number of click"
                        onChange={this.handleTextChange}
                        name="clicks"
                        value={this.state.banner.clicks}
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
              <Divider type="vertical" />
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
            <Drawer
              title={`Edit details ${this.state.banner.url}`}
              width={720}
              onClose={hideForm}
              visible={visible}
              entry={this.state.entry}
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Select image">
                      {getFieldDecorator("bannerImage", {
                        rules: [{ required: true, message: "Please select image" }]
                      })(
                        <Input
                          onChange={this.handlefileChange}
                          name="bannerImage"
                          type="file"
                        // value={this.state.banner.bannerImage}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Url">
                      <Input
                        placeholder="Please enter url"
                        onChange={this.handleTextChange}
                        name="url"
                        value={this.state.banner.url}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Clicks">
                      <Input
                        placeholder="Please enter number of click"
                        onChange={this.handleTextChange}
                        name="clicks"
                        value={this.state.banner.clicks}
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

const BannerForm = Form.create()(BannerFormRaw);
export default BannerForm;

// import React, { Component } from "react";
// import { Drawer, Form, Button, Col, Row, Input, message, Divider } from "antd";
// import { PUT_FAQ_URL, POST_FAQ_URL } from "../utils/endpoints";
// import axios from "axios";

// class BannerFormRaw extends Component {
//   state = {
//     visible: false,
//     faq: {}
//   };

//   handleTextChange = e => {
//     let faq = this.state.faq;
//     if (e.target.name === "phone") {
//       faq[e.target.name] = Number(e.target.value);
//     } else {
//       faq[e.target.name] = e.target.value;
//     }
//     this.setState({ faq });
//   };

//   handleSubmit = () => {
//     const token = localStorage.getItem("token");
//     let faq = this.state.faq;
//     console.log(faq);

//     if (this.props.mode === "new") {
//       axios
//         .post(
//           POST_FAQ_URL,
//           {
//             ...faq
//           },
//           {
//             headers: {
//               Authorization: token
//             }
//           }
//         )
//         .then(res => {
//           message.success("Faq created successfully!");
//           window.location.reload();
//         })
//         .catch(err => {
//           message.error(err.response.data.response);
//         });
//     } else {
//       axios
//         .put(
//           PUT_FAQ_URL + "?id=" + this.props.entry,
//           {
//             ...faq,
//             // id: faq._id
//           },
//           {
//             headers: {
//               Authorization: token
//             }
//           }
//         )
//         .then(res => {
//           message.success("Faq updated successfully!");
//           window.location.reload();
//         })
//         .catch(err => {
//           message.error(err.response.data.response);
//         });
//     }
//   };

//   componentWillReceiveProps(props) {
//     if (props.mode === "edit") {
//       this.setState({ user: props.entry });
//     }
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const { visible, hideForm, mode, entry } = this.props;
//     return (
//       <div>
//         {mode === "new" ? (
//           <Drawer title="Add a new Faq" width={720} onClose={hideForm} visible={visible}>
//             <Form layout="vertical" hideRequiredMark>
//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item label="Title">
//                     {getFieldDecorator("title", {
//                       rules: [{ required: true, message: "Please enter title" }]
//                     })(
//                       <Input
//                         placeholder="Please enter title"
//                         onChange={this.handleTextChange}
//                         name="title"
//                         value={this.state.faq.title}
//                       />
//                     )}
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item label="Content">
//                     {getFieldDecorator("content", {
//                       rules: [{ required: true, message: "Please enter content" }]
//                     })(
//                       <Input
//                         placeholder="Please enter content"
//                         onChange={this.handleTextChange}
//                         name="content"
//                         value={this.state.faq.content}
//                       />
//                     )}
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Form>
//             <div
//               style={{
//                 position: "absolute",
//                 left: 0,
//                 bottom: 0,
//                 width: "100%",
//                 borderTop: "1px solid #e9e9e9",
//                 padding: "10px 16px",
//                 background: "#fff",
//                 textAlign: "right"
//               }}
//             >
//               <Button onClick={hideForm} style={{ marginRight: 8 }}>
//                 Cancel
//               </Button>
//               <Divider type="vertical" />
//               <Button onClick={this.handleSubmit} type="primary">
//                 Submit
//               </Button>
//             </div>
//           </Drawer>
//         ) : (
//             <Drawer
//               title={`Edit details ${this.state.faq && this.state.faq.title}`}
//               width={720}
//               onClose={hideForm}
//               visible={visible}
//               entry={this.state.entry}
//             >
//               <Form layout="vertical" hideRequiredMark>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item label="Title">
//                       <Input
//                         placeholder="Please enter title"
//                         value={this.state.faq && this.state.faq.title}
//                         name="title"
//                         onChange={this.handleTextChange}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item label="Content">
//                       <Input
//                         placeholder="Please enter content"
//                         value={this.state.faq && this.state.faq.content}
//                         name="content"
//                         onChange={this.handleTextChange}
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </Form>
//               <div
//                 style={{
//                   position: "absolute",
//                   left: 0,
//                   bottom: 0,
//                   width: "100%",
//                   borderTop: "1px solid #e9e9e9",
//                   padding: "10px 16px",
//                   background: "#fff",
//                   textAlign: "right"
//                 }}
//               >
//                 <Button onClick={hideForm} style={{ marginRight: 8 }}>
//                   Cancel
//               </Button>
//                 <Button onClick={this.handleSubmit} type="primary">
//                   Submit
//               </Button>
//               </div>
//             </Drawer>
//           )}
//       </div>
//     );
//   }
// }

// const BannerForm = Form.create()(BannerFormRaw);
// export default BannerForm;
