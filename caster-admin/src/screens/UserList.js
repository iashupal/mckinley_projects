import React, { Component } from 'react';
import {
  Table,
  Button,
  message,
  Card,
  Popover,
  Input,
} from 'antd';
import axios from 'axios';
import { GET_USER_URL, DEACTIVATE_USER_URL } from '../utils/endpoints';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import UserForm from '../components/UserForm';
import profileImage from '../images/profile.png';
import '../css/common.css'
const token = localStorage.getItem('token');

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null,
      filtered: false,
      filters: {},
      csvData: [
        [
          'id',
          'email',
          'user name',
          'coffeeCoupons',
          'verificationType',
          'userStatus',
        ],
      ],
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.columns = [
      {
        title: '사진',
        dataIndex: 'userImage',
        key: 'users[0].userImage',
        render: (text, record) => (
          <img
            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
            src={record.userImage ? record.userImage : profileImage}
            alt="user_image"
          />
        ),
        width: 20,
        className: 'text-align-center'
      },
      {
        title: '이메일',
        dataIndex: 'email',
        key: 'users[0].email',
        render: (text, record) => <span>{record.email}</span>,
        width: 20,
        className: 'text-align-center'
      },
      {
        title: '생년월일',
        dataIndex: 'dob',
        key: 'users[0].dob',
        render: (text, record) => <span>{record.dob.split('T')[0]}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.dob - b.dob,
        sortDirections: ['descend', 'ascend'],
        width: 120,
        className: 'text-align-center'
      },
      {
        title: '성별',
        dataIndex: 'gender',
        key: 'users[0].gender',
        render: (text, record) => <span>{record.gender}</span>,
        width: 60,
        className: 'text-align-center'
      },

      {
        title: '닉네임',
        dataIndex: 'nickname',
        key: 'users[0].username',
        render: (text, record) => <span>{record.username}</span>,
        width: 60,
        className: 'text-align-center'
      },
      {
        title: '참여 카드수',
        dataIndex: 'no_of_participating_casts',
        key: 'no_of_participating_casts',
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          a.no_of_participating_casts - b.no_of_participating_casts,
        sortDirections: ['descend', 'ascend'],
        width: 170,
        className: 'text-align-center'
      },
      {
        title: '작성 댓글수',
        dataIndex: 'comments',
        key: 'users[0].no_of_comments',
        render: (text, record) => <span>{record.no_of_comments}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.no_of_comments - b.no_of_comments,
        sortDirections: ['descend', 'ascend'],
        width: 170,
        className: 'text-align-center'
      },

      {
        title: '최초 가입일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record) => <span>{record.createdAt.split('T')[0]}</span>,
        // moment(appointment.appointmentDate).format("MMMM Do YYYY, h:mm a")
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          Date.parse(a.createdAt.split('T')[0]) -
          Date.parse(b.createdAt.split('T')[0]),
        sortDirections: ['descend', 'ascend'],
        width: 170,
        className: 'text-align-center'
      },
      {
        title: '마지막 접속일',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
        render: (text, record) => <span>{record.updatedAt.split('T')[0]}</span>,
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          Date.parse(a.updatedAt.split('T')[0]) -
          Date.parse(b.updatedAt.split('T')[0]),
        sortDirections: ['descend', 'ascend'],
        width: 200,
        className: 'text-align-center'
      },
      {
        title: '현재 보유금액',
        dataIndex: 'points',
        key: 'points',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.points - b.points,
        sortDirections: ['descend', 'ascend'],
        width: 200,
        className: 'text-align-center'
      },

      {
        title: '',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Button type="primary" size="small" icon="unordered-list" onClick={() => this.setUser(record._id)}>
              상세보기
            </Button>
          </span>
        ),
        width: 250,
        className: 'text-align-center'
      },
    ];
  }

  componentDidMount() {
    this.getUsers();
  }

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  getUsers(searchText = null, filters = {}) {
    const token = localStorage.getItem('token');
    this.setState({ loading: true });

    let filterString = '';
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `?${key}=${filters[key]}`;
      }
    });

    let searchString = '';
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    axios
      .get(GET_USER_URL + searchString + filterString, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('User list', res.data.Body);
        return res.data.Body;
      })
      .then(users => {
        console.log(users);
        let filteredUsers = [];
        if (typeof (users) === typeof ('abc')) {
          filteredUsers = [];
        } else {
          filteredUsers = users.filter(item => {
            return !item.isDeactivated;
          });
        }

        this.setState({ users: filteredUsers, loading: false });
        this.createCSV(filteredUsers);
      })
      .catch(err => {
        message.error(err.message);
      });
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getUsers(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getUsers(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getUsers();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getUsers();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case 'coffeeCoupons':
        filters.coffeeCoupons = value;
        break;
      case 'status':
        filters.isVerified = value;
        break;
      default:
        console.log('Error');
    }
    this.setState({ filters: filters });
  }

  setCSV() {
    // csvData: [["id", "email", "user name", "verifyType", "profileStatus", "userStatus"]];
    let csvData = this.state.csvData;
    this.state.users.map(user => {
      let entry = [];
      entry.push(String(user._id));
      entry.push(String(user.email));
      entry.push(String(user.username));
      entry.push(String(user.verifyType));
      entry.push(String(user.profileStatus));
      entry.push(String(user.userStatus));
      csvData.push(entry);
    });
    this.setState({ csvData: csvData });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: 'edit',
      entry,
    });
  };

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
        this.refresh();
      })
      .catch(err => console.log(err));
  };

  createCSV = entry => {
    let csv = [
      [
        'Image',
        'Email',
        'DOB',
        'Gender',
        'Nickname',
        'No. of Participating Casts',
        'No. of Comments',
        'Registration Date',
        'Last Login Date',
        'Current MIC Points',
      ],
    ];

    entry.map((item, index) => {
      csv.push([]);
      csv[index + 1].push(item.userImage);
      csv[index + 1].push(item.email);
      csv[index + 1].push(moment(item.dob).format('YYYY-MM-DD'));
      csv[index + 1].push(item.gender);
      csv[index + 1].push(item.username);
      csv[index + 1].push(item.no_of_participating_casts);
      csv[index + 1].push(item.no_of_comments);
      csv[index + 1].push(moment(item.createdAt).format('YYYY-MM-DD'));
      csv[index + 1].push(moment(item.updatedAt).format('YYYY-MM-DD'));
      csv[index + 1].push(item.points);
    });

    // this.state.csvData = csv;

    this.setState({ csvData: csv });
  };

  setUser = id => {
    window.location.href = '../membership/' + id;
  }

  confirmUser(_id) {
    axios
      .patch(
        `https://outlier.mckinleyrice.com/admin/user?userId=${_id}`,
        { id: _id, isVerified: true, isRegistered: true },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  deleteUser(_id) {
    axios
      .delete(`https://outlier.mckinleyrice.com/admin/user?userId=${_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const {
      users,
      loading,
      formVisible,
      searchText,
      searched,
      filtered,
      mode,
      entry,
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
          title={searched ? `Results for "${searchText}"` : '회원관리'}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="이메일 / 닉네임"
                    onChange={this.handleChange}
                    name="searchText"
                    value={searchText}
                    disabled={searched}
                  />
                  <br />
                  <br />
                  <Button
                    style={{ width: '100%' }}
                    type={searched ? 'danger' : 'primary'}
                    icon={searched ? 'delete' : 'search'}
                    onClick={searched ? this.clearSearch : this.submitSearch}
                    disabled={!!!searchText}
                  >
                    {searched ? '명확한 검색' : '검색'}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button
                type="dashed"
                icon="search"
                style={{ margin: 5 }}
                disabled={filtered}
              >
                {searched ? searchText : '이메일 / 닉네임'}
              </Button>
            </Popover>,

            <CSVLink
              data={this.state.csvData}
              filename={`users-${moment(new Date()).toISOString()}.csv`}
            >
              <Button type="primary" style={{ margin: 5 }}>
                Export Data
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={users}
            columns={this.columns}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 6,
            }}
            loading={loading}
            entry={this.state.entry}
            mode={this.state.mode}
            scroll={{ x: 1300 }}
          />
        </Card>
        <UserForm
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

export default UserList;
