import React, { Component } from "react";
import { Card, Form, Row, Button, Col, message, Table } from "antd";
import { CSVLink } from "react-csv";
import moment from "moment";
import axios from "axios";
import { GET_USERLIKED_CAST_URL, GET_USER_PARTICIPATING_CAST_URL, GET_USER_COMMENT_URL, GET_USER_URL, DEACTIVATE_USER_URL } from "../utils/endpoints";
import profileImage from '../images/profile.png';
import UserForm from '../components/UserForm';
import '../css/common.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formVisible: false,
      mode: '',
      userDetail: [],
      progressCast: [],
      closedCast: [],
      comments: [],
      userId: '',
      user: {},
      likedCasts: [],
      csvData_likedCasts: [],
      csvData_inProgressCasts: [],
      csvData_closedCasts: [],
    };
    // this.handleChange = this.handleChange.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);

    this.columns1 = [
      {
        title: "이미지",
        dataIndex: "photo",
        key: "record.castImage",
        className: 'text-align-center d-flex-center',
        render: (text, record) => (record.castImage)
          ? <img style={{ width: "45px", height: "45px" }} src={record.castImage} alt="cast_image" />
          : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
      },
      {
        title: "타이틀",
        dataIndex: "title",
        key: "record.title",
        className: 'text-align-center',
        render: (text, record) => <span>{record.title}</span>
      },
      {
        title: "Tag",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.category}</span>
      },
      {
        title: "Type",
        dataIndex: "title",
        key: "record.castType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.castType}</span>
      },
      {
        title: "답변 Type",
        dataIndex: "title",
        key: "record.answerType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.answerType}</span>
      },
      {
        title: "START TIME",
        dataIndex: "title",
        key: "record.startTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.startTime.split('T')[0]}</span>
      },
      {
        title: "CLOSE TIME",
        dataIndex: "title",
        key: "record.closeTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.closeTime.split('T')[0]}</span>
      },
      {
        title: "총 상금",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.totalReward}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalReward - b.totalReward,
        sortDirections: ['descend', 'ascend'],
      }
    ];
    this.columns21 = [
      {
        title: "이미지",
        dataIndex: "photo",
        key: "record.castImage",
        className: 'text-align-center d-flex-center',
        render: (text, record) => (record.castImage)
          ? <img style={{ width: "45px", height: "45px" }} src={record.castImage} alt="cast_image" />
          : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
      },
      {
        title: "타이틀",
        dataIndex: "title",
        key: "record.title",
        className: 'text-align-center',
        render: (text, record) => <span>{record.title}</span>
      },
      {
        title: "Tag",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.category}</span>
      },
      {
        title: "Type",
        dataIndex: "title",
        key: "record.castType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.castType}</span>
      },
      {
        title: "답변 Type",
        dataIndex: "title",
        key: "record.answerType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.answerType}</span>
      },
      {
        title: "START TIME",
        dataIndex: "title",
        key: "record.startTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.startTime.split('T')[0]}</span>
      },
      {
        title: "CLOSE TIME",
        dataIndex: "title",
        key: "record.closeTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.closeTime.split('T')[0]}</span>
      },
      {
        title: "총 상금",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.totalReward}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalReward - b.totalReward,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "제출답변",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.playedUsers[0].answer}</span>
      },
      {
        title: "베팅금액",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.playedUsers[0].pointsBid}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.playedUsers[0].pointsBid - b.playedUsers[0].pointsBid,
        sortDirections: ['descend', 'ascend'],
      }
    ];

    this.columns22 = [
      {
        title: "이미지",
        dataIndex: "photo",
        key: "record.castImage",
        className: 'text-align-center d-flex-center',
        render: (text, record) => (record.castImage)
          ? <img style={{ width: "45px", height: "45px" }} src={record.castImage} alt="cast_image" />
          : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
      },
      {
        title: "타이틀",
        dataIndex: "title",
        key: "record.title",
        className: 'text-align-center',
        render: (text, record) => <span>{record.title}</span>
      },
      {
        title: "Tag",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.category}</span>
      },
      {
        title: "Type",
        dataIndex: "title",
        key: "record.castType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.castType}</span>
      },
      {
        title: "답변 Type",
        dataIndex: "title",
        key: "record.answerType",
        className: 'text-align-center',
        render: (text, record) => <span>{record.answerType}</span>
      },
      {
        title: "START TIME",
        dataIndex: "title",
        key: "record.startTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.startTime.split('T')[0]}</span>
      },
      {
        title: "CLOSE TIME",
        dataIndex: "title",
        key: "record.closeTime",
        className: 'text-align-center',
        render: (text, record) => <span>{record.closeTime.split('T')[0]}</span>
      },
      {
        title: "총 상금",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.totalReward}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalReward - b.totalReward,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "제출답변",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.playedUsers[0].answer}</span>
      },
      {
        title: "베팅금액",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{record.playedUsers[0].pointsBid}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.playedUsers[0].pointsBid - b.playedUsers[0].pointsBid,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "정답여부",
        dataIndex: "title",
        key: "record.totalReward",
        className: 'text-align-center',
        render: (text, record) => <span>{Number(record.playedUsers[0].answer) === Number(record.castAnswer) ? 'true' : 'false'}</span>
      }
    ];

    this.columns3 = [
      {
        title: "이미지",
        dataIndex: "photo",
        key: "record.castImage",
        className: 'text-align-center d-flex-center',
        render: (text, record) => (record.castImage)
          ? <img style={{ width: "45px", height: "45px" }} src={record.castImage} alt="cast_image" />
          : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
      },
      {
        title: "타이틀",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.castId ? record.castId.title : ''}</span>
      },
      {
        title: "댓글내용",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.content}</span>
      },
      {
        title: "좋아요 수",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.no_of_likes}</span>
      },
      {
        title: "신고 수",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.no_of_reports}</span>
      },
      {
        title: "최초작성일",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => <span>{record.createdAt.split('T')[0]}</span>
      },
      {
        title: "",
        dataIndex: "title",
        key: "record.category",
        className: 'text-align-center',
        render: (text, record) => {
          return (
            <div>
              <Button type='danger' icon='delete' size='small' onClick={() => this.deleteComment(record._id)}>삭제하기</Button>
            </div>
          )
        }
      }
    ];
  }

  componentDidMount() {
    const userId = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
    this.setState({ userId });
    this.getUsers();
    this.getUserDetail(userId);
  }

  getUsers = () => {
    axios.get(GET_USER_URL, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log('users --->', res.data.Body);
        let user;
        res.data.Body.map(item => {
          if (item._id === this.state.userId) {
            user = item;
          }
        })
        console.log('user --->', user);
        this.setState({ user });
      })
      .catch(err => {
        console.log(err);
      })
  }

  getUserDetail(id) {
    let urlpoint = GET_USERLIKED_CAST_URL + "?id=" + id;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(urlpoint, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("liked cast", res.data.casts);
        this.setState({ likedCasts: res.data.casts, loading: false });
        this.createCSV(res.data.casts, 'liked');
      })
      .catch(err => {
        message.error(err.message);
      });
    axios
      .get(`https://apicaster.mckinleyrice.com/admin/user-participating?state=in-progress&id=${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("progress Cast", res.data.casts);
        this.setState({ progressCast: res.data.casts, loading: false });
        this.createCSV(res.data.casts, 'progress');
      })
      .catch(err => {
        message.error(err.message);
      });
    axios
      .get(GET_USER_PARTICIPATING_CAST_URL + "?state=closed&id=" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("closed cast", res.data.casts);
        this.setState({ closedCast: res.data.casts, loading: false });
        this.createCSV(res.data.casts, 'closed');
      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_USER_COMMENT_URL + "?id=" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("comments ---->", res.data.Body);
        this.setState({ comments: res.data.Body, loading: false });
        // this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  userDetailCard = (user) => {
    return (
      <Card title='현재 보유금액' headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
        <Card>
          <Row>
            <Col span={2}>
              <div><img style={{ width: '75px', height: '75px', borderRadius: '50%', marginLeft: '0.5rem' }} src={user.userImage ? user.userImage : profileImage} alt='user_image' /></div>
              <div style={{ textAlign: 'center', width: '100%', marginTop: '0.5rem' }}><span>{user.username}</span></div>
            </Col>
            <Col span={6} style={{ padding: '0.2rem', marginLeft: '1.8rem' }}>
              <div><span>이메일: </span><span>{user.email}</span></div>
              <div style={{ marginTop: '1.2rem' }}><span>생년월일: </span><span>{user.dob ? user.dob.split('T')[0] : ''}</span></div>
              <div style={{ marginTop: '1.2rem' }}><span>성별: </span><span>{user.gender}</span></div>
            </Col>
            <Col span={5} style={{ padding: '0.2rem' }}>
              <div><span>최초 가입일: </span><span>{user.createdAt ? user.createdAt.split('T')[0] : ''}</span></div>
              <div style={{ marginTop: '1.2rem' }}><span>마지막 접속일: </span><span>{user.updatedAt ? user.updatedAt.split('T')[0] : ''}</span></div>
            </Col>
            <Col span={5} style={{ padding: '0.2rem', marginLeft: '1.2rem' }}>
              <div><span>현재보유마이크: </span><span>{user.points}</span></div>
              <div style={{ marginTop: '1.2rem' }}><span>참여 카드수: </span>{user.no_of_participating_casts}<span></span></div>
              <div style={{ marginTop: '1.2rem' }}><span>댓글 수: </span>{user.no_of_comments}<span></span></div>
            </Col>
            <Col span={4} style={{ padding: '0.2rem', marginLeft: '1.2rem' }}>
              <div><Button type='primary' icon='edit' size='middle' onClick={() => this.showEditForm(user)}>수정</Button></div>
              <div><Button type="danger" icon="stop" size='middle' style={{ marginTop: '0.8rem' }} onClick={() => this.deactivateUser(user._id)}>탈퇴</Button></div>
            </Col>
          </Row>
        </Card>
      </Card>
    )
  }

  deactivateUser = id => {
    const token = localStorage.getItem('token');

    axios
      .put(
        DEACTIVATE_USER_URL,
        { userId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        message.success('User deactivated!');
        setTimeout(() => {
          window.location.href = '../users'
        }, 500);
      })
      .catch(err => console.log(err));
  };

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: 'edit',
      entry,
    });
  };

  showForm = () => {
    this.setState({
      formVisible: true,
      mode: 'new',
    });
  }

  hideForm = () => {
    this.setState({
      formVisible: false,
    });
  }

  deleteComment = id => {
    const token = localStorage.getItem('token');
    axios.delete(
      `https://apicaster.mckinleyrice.com/admin/deleteComment?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then(res => {
        message.success('Comment Deleted');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(err => console.log(err));
  }

  createCSV = (entry, cast) => {
    if (cast === 'liked') {
      let csv = [['Cast Image', 'Cast Title', 'Cast Category', 'Cast Type', 'Cast Answer Type', 'Start Time', 'Close Time', 'Total Reward']];

      entry.map((item, index) => {
        csv.push([]);
        csv[index + 1].push(item.castImage);
        csv[index + 1].push(item.title);
        csv[index + 1].push(item.category);
        csv[index + 1].push(item.castType);
        csv[index + 1].push(item.answerType);
        csv[index + 1].push(item.startTime.split('T')[0]);
        csv[index + 1].push(item.closeTime.split('T')[0]);
        csv[index + 1].push(item.totalReward);
      })

      this.setState({ csvData_likedCasts: csv });
    } else if (cast === 'progress') {
      let csv = [['Cast Image', 'Cast Title', 'Cast Category', 'Cast Type', 'Cast Answer Type', 'Start Time', 'Close Time', 'Total Reward', 'Submitted Answer', 'Betted Point Amount']];

      entry.map((item, index) => {
        csv.push([]);
        csv[index + 1].push(item.castImage);
        csv[index + 1].push(item.title);
        csv[index + 1].push(item.category);
        csv[index + 1].push(item.castType);
        csv[index + 1].push(item.answerType);
        csv[index + 1].push(item.startTime.split('T')[0]);
        csv[index + 1].push(item.closeTime.split('T')[0]);
        csv[index + 1].push(item.totalReward);
        csv[index + 1].push(item.playedUsers[0].answer);
        csv[index + 1].push(item.playedUsers[0].pointsBid);
      })

      this.setState({ csvData_inProgressCasts: csv });
    } else if (cast === 'closed') {
      let csv = [['Cast Image', 'Cast Title', 'Cast Category', 'Cast Type', 'Cast Answer Type', 'Start Time', 'Close Time', 'Total Reward', 'Submitted Answer', 'Betted Point Amount', 'Correct Answer']];

      entry.map((item, index) => {
        csv.push([]);
        csv[index + 1].push(item.castImage);
        csv[index + 1].push(item.title);
        csv[index + 1].push(item.category);
        csv[index + 1].push(item.castType);
        csv[index + 1].push(item.answerType);
        csv[index + 1].push(item.startTime.split('T')[0]);
        csv[index + 1].push(item.closeTime.split('T')[0]);
        csv[index + 1].push(item.totalReward);
        csv[index + 1].push(item.playedUsers[0].answer);
        csv[index + 1].push(item.playedUsers[0].pointsBid);
        csv[index + 1].push(Number(item.playedUsers[0].answer) === Number(item.castAnswer) ? 'true' : 'false');
      })

      this.setState({ csvData_closedCasts: csv });
    }
  }

  render() {
    const { progressCast, closedCast, comments, loading, likedCasts } = this.state;

    return (
      <div>
        {/* {User Detail} */}
        <div style={{ margin: "10px 0" }}>
          {this.userDetailCard(this.state.user)}
        </div>
        {/* Liked */}
        <div style={{ margin: "10px 0" }}>
          <Card
            title="찜한 캐스트 카드"
            headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
            extra={[
              <CSVLink data={this.state.csvData_likedCasts} filename={`user-${this.state.user.email}-likedcasts-${moment(new Date()).toISOString()}.csv`}>
                <Button type='primary' size='middle' style={{ margin: 5 }} className='btn-clickable'>
                  Export Data
              </Button>
              </CSVLink>
            ]}
          >
            <Table
              dataSource={likedCasts}
              columns={this.columns1}
              size="small"
              pagination={{
                showLessItems: true,
                pageSize: 3
              }}
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Card>
        </div>
        {/* Participating and progress cast */}
        <div style={{ margin: "10px 0" }}>
          {/* yhi hai? */}
          <Card title="참여중인 캐스트 카드" headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }} extra={[
            <CSVLink data={this.state.csvData_inProgressCasts} filename={`user-${this.state.user.email}-inprogresscasts-${moment(new Date()).toISOString()}.csv`}>
              <Button type='primary' size='middle' style={{ margin: 5 }} className='btn-clickable'>
                Export Data
              </Button>
            </CSVLink>
          ]}>
            <Table
              dataSource={progressCast}
              columns={this.columns21}
              size="small"
              pagination={{
                showLessItems: true,
                pageSize: 3
              }}
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Card>
        </div>
        {/* Participating and closed cast */}
        <div style={{ margin: "10px 0" }}>
          <Card title="참여완료 캐스트 카드" headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }} extra={[
            <CSVLink data={this.state.csvData_closedCasts} filename={`user-${this.state.user.email}-closedcasts-${moment(new Date()).toISOString()}.csv`}>
              <Button type='primary' size='middle' style={{ margin: 5 }} className='btn-clickable'>
                Export Data
              </Button>
            </CSVLink>
          ]}>
            <Table
              dataSource={closedCast}
              columns={this.columns22}
              size="small"
              pagination={{
                showLessItems: true,
                pageSize: 3
              }}
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Card>
        </div>
        {/* comment */}
        <div style={{ margin: "10px 0" }}>
          <Card title="댓글" headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
            <Table
              dataSource={comments}
              columns={this.columns3}
              size="small"
              pagination={{
                showLessItems: true,
                pageSize: 3
              }}
              loading={loading}
              scroll={{ x: 1300 }}
              // style={{ borderColor: 'transparent', backgroundColor: 'white' }}
            />
          </Card>
        </div>
        <UserForm
          visible={this.state.formVisible}
          showForm={this.showForm}
          hideForm={this.hideForm}
          mode={this.state.mode}
          entry={this.state.entry}
        />
      </div>
    );
  }
}
export default Form.create({ name: "userComment" })(UserDetail);
