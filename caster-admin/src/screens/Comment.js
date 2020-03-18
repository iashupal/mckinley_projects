import React, { Component } from 'react';
import { Table, Button, message, Card } from 'antd';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import moment from 'moment';
import { GET_COMMENTS_URL } from '../utils/endpoints';
import Axios from 'axios';
import '../css/common.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '이미지',
        dataIndex: 'castImage',
        key: 'comments[0].castsinfo[0]',
        className: 'd-flex-center',
        render: (text, record) => (
          (record.castsinfo[0] !== undefined)
            ? <img
              style={{ width: '45px', height: '45px' }}
              src={
                record.castsinfo[0] !== undefined
                  ? record.castsinfo[0].castImage
                  : ''
              }
              alt={`cast_image`}
            />
            : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
        ),
        width: 150,
      },
      {
        title: '타이틀',
        dataIndex: 'title',
        key: 'comments[0].title',
        render: (text, record) => (
          <span>
            {record.castsinfo[0] !== undefined ? record.castsinfo[0].title : ''}
          </span>
        ),
        width: 250,
      },

      {
        title: '댓글내용',
        dataIndex: 'content',
        key: 'comments[0].content',
        render: (text, record) => <span>{record.content}</span>,
      },
      {
        title: '좋아요수',
        dataIndex: 'no_of_likes',
        key: 'comments[0].no_of_likes',
        render: (text, record) => <span>{record.no_of_likes}</span>,
        sorter: (a, b) => a.no_of_likes - b.no_of_likes,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '신고수',
        dataIndex: 'no_of_reports',
        key: 'comments[0].no_of_reports',
        render: (text, record) => <span>{record.no_of_reports}</span>,
        sorter: (a, b) => a.no_of_reports - b.no_of_reports,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '닉네임',
        dataIndex: 'author',
        key: 'comments[0].userinfo[0]',
        render: (text, record) => (
          <span>
            {record.userinfo[0].username ? record.userinfo[0].username : ''}
          </span>
        ),
      },
      {
        title: '최초작성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record) => (
          <span>{moment(record.createdAt).format('YYYY-MM-D ')}</span>
        ),
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          Date.parse(moment(a.createdAt).format('YYYY-MM-D ')) -
          Date.parse(moment(b.createdAt).format('YYYY-MM-D ')),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Button
              type="danger"
              icon="delete"
              size="small"
              onClick={() => this.deleteComment(record._id)}
            >
              삭제하기
            </Button>
          </span>
        ),
      },
    ];
    this.state = {
      comments: [],
      loading: false,
      searched: false,
      searchText: null,
      filtered: false,
      csvData: [],
    };
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.getComments = this.getComments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments(searchText = null, filters = {}) {
    const token = localStorage.getItem('token');
    this.setState({ loading: true });

    let filterString = '';
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `?${key}=${filters[key]}`;
      }
    });

    console.log(filterString);

    let searchString = '';
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(GET_COMMENTS_URL + searchString + filterString, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('comments', res.data.Body);
        this.createCSV(res.data.Body);
        this.setState({ comments: res.data.Body, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getComments(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getComments(this.state.filters);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getComments();
  }
  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getComments();
  }

  displayData = entry => {
    // this.createCSV(entry);
    return entry;
  };

  createCSV = entry => {
    let csv = [
      [
        'Image',
        'Title',
        'Comment',
        'No. of Reports',
        'No. of Likes',
        'Author',
        'Date',
      ],
    ];

    entry.map((item, index) => {
      csv.push([]);
      csv[index + 1].push(
        item.castsinfo[0] !== undefined ? item.castsinfo[0].castImage : ''
      );
      csv[index + 1].push(
        item.castsinfo[0] !== undefined ? item.castsinfo[0].title : ''
      );
      csv[index + 1].push(item.content);
      csv[index + 1].push(item.no_of_reports);
      csv[index + 1].push(item.no_of_likes);
      csv[index + 1].push(
        item.userinfo[0].username ? item.userinfo[0].username : ''
      );
      csv[index + 1].push(moment(item.createdAt).format('YYYY-MM-D '));
    });

    this.setState({ csvData: csv });
  };

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case 'status':
        filters.userStatus = value;
        break;
      default:
        console.log('Error');
    }
    this.setState({ filters: filters });
  }

  deleteComment(_id) {
    const token = localStorage.getItem('token');
    Axios.delete(
      `https://apicaster.mckinleyrice.com/admin/deleteComment?id=${_id}`,
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
      comments,
      loading,
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
          title={'댓글관리'}
          extra={[
            <CSVLink
              data={this.state.csvData}
              filename={`comments-${moment(new Date()).toISOString()}.csv`}
            >
              <Button type="primary" style={{ margin: 5 }} className='btn-clickable'>
                Export Data
              </Button>
            </CSVLink>,
          ]}
        >
          <Table
            dataSource={this.displayData(comments)}
            columns={this.columns}
            pagination={{
              pageSize: 4,
            }}
            loading={loading}
            scroll={{ x: 1300 }}
        />
        </Card>
      </div>
    );
  }
}

export default Comment;
