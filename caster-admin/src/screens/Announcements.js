import React, { Component } from 'react';
import { Table, Button, message, Card, Divider } from 'antd';
import axios from 'axios';
import moment from 'moment';
import AnnouncementForm from '../components/AnnouncementForm';
import { GET_ANNOUNCEMENT_URL } from '../utils/endpoints';
import '../css/common.css';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '타이틀',
        dataIndex: 'title',
        key: 'announcement[0].title',
        render: (text, record) => (
          <span>{record.title ? record.title : ''}</span>
        ),
      },
      {
        title: '내용',
        dataIndex: 'content',
        key: 'announcement[0].data.content',
        render: (text, record) => (
          <span>{record.content ? record.content : ''}</span>
        ),
      },
      {
        title: '게시일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record) => (
          <span>{moment(record.createdAt).format('YYYY-MM-D ')}</span>
        ),
      },

      {
        title: '',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              icon="edit"
              size="small"
              onClick={() => this.showEditForm(record)}
            >
              수정하기
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              icon="delete"
              size="small"
              onClick={() => this.deleteAnnouncement(record._id)}
            >
              삭제하기
            </Button>
          </span>
        ),
      },
    ];
    this.state = {
      announcement: [],
      loading: false,
      formVisible: false,
      searchText: null,
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.getAnnouncement = this.getAnnouncement.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    this.getAnnouncement();
  }

  getAnnouncement() {
    const token = localStorage.getItem('token');
    this.setState({ loading: true });
    axios
      .get(GET_ANNOUNCEMENT_URL, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('announcement', res.data.result);
        this.setState({ announcement: res.data.result, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showForm() {
    this.setState({
      formVisible: true,
      mode: 'new',
    });
  }

  hideForm() {
    this.setState({
      formVisible: false,
    });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: 'edit',
      entry,
    });
  };

  deleteAnnouncement(_id) {
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://apicaster.mckinleyrice.com/admin/delete-announcement?id=${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const {
      announcement,
      loading,
      formVisible,
      mode,
      entry,
      searchText,
      searched,
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
          title={searched ? `Results for "${searchText}"` : '공지사항'}
          extra={[
            <Button
              type="primary"
              icon="plus"
              style={{ margin: 5 }}
              onClick={this.showForm}
              className='btn-clickable'
            >
              새글 쓰기
            </Button>,
          ]}
        >
          <Table
            dataSource={announcement}
            columns={this.columns}
            pagination={{
              pageSize: 10,
            }}
            loading={loading}
            entry={this.state.entry}
            mode={this.state.mode}
          />
        </Card>
        <AnnouncementForm
          visible={formVisible}
          showForm={this.showForm}
          hideForm={this.hideForm}
          mode={mode}
          entry={entry}
        />
      </div>
    );
  }
}

export default Announcements;
