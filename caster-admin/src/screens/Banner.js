import React, { Component } from 'react';
import { Table, Button, message, Card, Input, Col, Row, Icon } from 'antd';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import {
  GET_BANNER_URL,
  ACTIVE_BANNER_URL,
  HIDE_BANNER_URL,
  DELETE_BANNER_URL,
  POST_BANNER_URL,
  SORT_ACTIVE_BANNER_URL
} from '../utils/endpoints';
import BannerForm from '../components/BannerForm';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import '../css/common.css';

const SortableItem = SortableElement(({ value }) => <Card style={{ margin: '0.8rem 0' }}>
  <Col span={2} className='text-align-center'>
    <span>
      <span style={{ margin: '0 0.5rem' }}>{value.index}</span>
      <span>
        <span icon='menu' style={{ cursor: "move", borderColor: 'transparent' }}><Icon type="menu" /></span>
      </span>
    </span>
  </Col>
  <Col span={5} className='d-flex-center text-align-center'>
    {(value.bannerImage)
      ? <img
        style={{ width: '200px', height: '50px', borderRadius: '4px' }}
        src={value.bannerImage}
        alt="banner_image"
      />
      : <div style={{ width: '200px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>}
  </Col>
  <Col span={2} className='text-align-center'>
    <span>{value.clicks}</span>
  </Col>
  <Col span={6} className='text-align-center'>
    <span>{value.author}</span>
  </Col>
  <Col span={3} className='text-align-center'>
    <span>{moment(value.createdAt).format('YYYY-MM-DD')}</span>
  </Col>
  <Col span={4} className='text-align-center'>
    <span>{value.url}</span>
  </Col>
  <Col span={2} className='text-align-center'>
    <span>
      <Button
        type="default"
        size="minus-circle"
        onClick={() => hideBanner(value._id)}
      >
        노출 중지
            </Button>
    </span>
  </Col>
</Card>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <Row style={{ width: '100%' }}>
      {items.map((value, index) => {
        value.index = index + 1;
        return (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        );
      })}
    </Row>
  );
});

const hideBanner = (id) => {
  const token = localStorage.getItem('token');
  axios
    .put(
      HIDE_BANNER_URL,
      {
        id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(res => {
      message.success('Banner hidden successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch(err => {
      message.error(err.Body);
    });
}

class Banner extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '이미지',
        dataIndex: 'bannerImage',
        key: 'banner.bannerImage',
        className: 'd-flex-center',
        render: (text, record) => (
          (record.bannerImage)
            ? <img
              style={{ width: '200px', height: '50px', borderRadius: '4px' }}
              src={record.bannerImage}
              alt="banner_image"
            />
            : <div style={{ width: '200px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
        ),
      },
      {
        title: '관리자',
        dataIndex: 'author',
        key: 'banner.author',
        // render: (text, record) => <span>{record.ownerInfo[0].username ? record.ownerInfo[0].username : ""}</span>
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'banner.url',
        // render: (text, record) => <span>{record.ownerInfo[0].username ? record.ownerInfo[0].username : ""}</span>
      },
      {
        title: '최초작성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record) => (
          <span>{moment(record.createdAt).format('YYYY-MM-D ')}</span>
        ),
      },
      {
        title: '클릭수',
        dataIndex: 'clicks',
        key: 'clicks',
        render: (text, record) => <span>{record.clicks}</span>,
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
              onClick={() => this.deleteBanner(record._id)}
            >
              삭제하기
            </Button>
          </span>
        ),
      },
    ];

    this.state = {
      banner: [],
      active: [],
      loading: false,
      activeListLoading: true,
      searched: false,
      searchText: null,
      filtered: false,
      formVisible: false,
      csvData: [],
      bannerImage: '',
      bannerImageText: '선택된 파일 없음',
      bannerURL: ''
    };

    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.getBanner = this.getBanner.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.activeBanner = this.activeBanner.bind(this);
  }

  componentDidMount() {
    this.getBanner();
    this.activeBanner();
  }

  activeBanner() {
    const token = localStorage.getItem('token');
    axios
      .get(ACTIVE_BANNER_URL, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log("active banner", res.data.Body);
        this.setState({ active: res.data.Body, activeListLoading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  getBanner(searchText = null, filters = {}) {
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
      .get(GET_BANNER_URL + searchString + filterString, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('banner', res.data.Body);
        this.setState({ banner: res.data.Body, loading: false });
        this.createCSV(res.data.Body);
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  createCSV = entry => {
    let csv = [
      [
        'Image',
        'Author',
        'URL',
        'Date',
        'Clicks'
      ],
    ];

    entry.map((item, index) => {
      csv.push([]);
      csv[index + 1].push(
        item.bannerImage
      );
      csv[index + 1].push(
        item.author
      );
      csv[index + 1].push(item.url);
      csv[index + 1].push(moment(item.createdAt).format('YYYY-MM-DD'));
      csv[index + 1].push(item.clicks);
    });

    this.setState({ csvData: csv });
  };


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getBanner(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getBanner(this.state.filters);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getBanner();
  }
  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getBanner();
  }

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

  deleteBanner(id) {
    const token = localStorage.getItem('token');
    axios
      .delete(DELETE_BANNER_URL + '?id=' + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => window.location.reload())
      .catch(err => message.error('Banner not deleted!'));
  }

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  handleTextChange = (value, state) => {
    console.log(value);
    this.setState({ [state]: value });
  };

  handleImageChange = (value, state) => {
    console.log(value);
    this.setState({ [state]: value, [state + 'Text']: value.name });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    var formData = new FormData();
    formData.append("bannerImage", this.state.bannerImage);
    formData.append("url", this.state.bannerURL);

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
        message.error('Banner not added! Either maximum limit reached for active banners or network error');
      });
  }

  addNewBannerCard = () => {
    return (
      <Card style={{ marginBottom: '0.8rem', padding: '0.5rem' }} headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }} title='배너/광고관리'>
        {/* <Row style={{marginBottom:'0.8rem'}}><label style={{  fontSize: '1.2rem', fontWeight: 'bold' }}>Add Banner</label></Row> */}
        <Card>
          <Row>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ border: '1px solid lightgrey', borderRadius: '4px', height: '150px', width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {(this.state.bannerImage !== '') ? <img src={URL.createObjectURL(this.state.bannerImage)} alt='banner_image' style={{ width: '101%', height: '101%' }} /> : <label>No Image</label>}
              </div>
            </Col>
            <Col span={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: '' }}>
              <Row>
                <Input
                  // placeholder="Please enter betting guide"
                  onChange={(e) => this.handleImageChange(e.target.files[0], 'bannerImage')}
                  type="file"
                  name="bannerImage"
                  id="bannerImage"
                  multiple
                  style={{ display: 'none' }}
                // value={this.state.bannerImage}
                />
                <label htmlFor='bannerImage' style={{ border: '1px solid lightgrey', padding: '0.25rem 1.2rem', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                <label style={{ marginLeft: '0.5rem' }}>{this.state.bannerImageText}</label>
              </Row>
              <Row style={{ marginTop: '1.8rem' }}>
                <Input
                  placeholder="URL 입력"
                  onChange={(e) => this.handleTextChange(e.target.value, 'bannerURL')}
                  name="bannerURL"
                  value={this.state.bannerURL}
                />
              </Row>
              <Row style={{ marginTop: '1.8rem' }}>
                <Button type='primary' size='medium' onClick={(e) => this.handleFormSubmit(e)}>등록</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </Card>
    )
  }

  activeBannersCard = () => {
    return (
      <Card title={'현재 노출 배너 (최대5개)'} loading={this.state.activeListLoading} headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: '#F0F2F5', borderColor: 'transparent', boxSizing: 'border-box' }}>
        <Row style={{ width: '95%', position: 'relative', left: '25px' }}>
          <Col span={2} className='text-align-center'>순위</Col>
          <Col span={5} className='text-align-center'>이미지</Col>
          <Col span={2} className='text-align-center'>클릭수</Col>
          <Col span={6} className='text-align-center'>관리자</Col>
          <Col span={3} className='text-align-center'>최초작성일</Col>
          <Col span={4} className='text-align-center'>URL</Col>
          <Col span={2} className='text-align-center'></Col>
        </Row>
        <SortableList items={this.state.active} onSortEnd={this.onSortEnd} />
      </Card>
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ active }) => ({
      active: arrayMove(active, oldIndex, newIndex),
    }));

    let sortedActiveBannerArray = arrayMove(this.state.active, oldIndex, newIndex);
    let sortedActiveBannerArraySend = [];
    sortedActiveBannerArray.map((item, index) => {
      sortedActiveBannerArraySend.push({ id: item._id, index: item.index })
    })
    axios.patch(SORT_ACTIVE_BANNER_URL, {
      bannerOrder: [...sortedActiveBannerArraySend]
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        message.success('Active banners order updated!');
      })
      .catch(err => {
        message.error('Error in updated active banners order!');
      })
  };

  render() {
    const {
      banner,
      loading,
      formVisible,
      mode,
      entry,
    } = this.state;
    return (
      <div>

        {this.addNewBannerCard()}
        {this.activeBannersCard()}

        <div style={{ margin: '10px 0' }}>
          <Card
            headStyle={{ color: '#1b253a', fontSize: '1rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
            title={'배너 역사'}
            extra={[
              // <Button type="primary" icon="plus" onClick={this.showForm}>
              //   배너 추가
              // </Button>,
              <CSVLink
                data={this.state.csvData}
                filename={`banners-${moment(new Date()).toISOString()}.csv`}
              >
                <Button type="primary" style={{ margin: 5 }} className='btn-clickable'>
                  Export Data
              </Button>
              </CSVLink>
            ]}
          >
            <Table
              dataSource={banner}
              columns={this.columns}
              pagination={{
                pageSize: 10,
              }}
              loading={loading}
              entry={this.state.entry}
              mode={this.state.mode}
            />
            <BannerForm
              visible={formVisible}
              showForm={this.showForm}
              hideForm={this.hideForm}
              mode={mode}
              entry={entry}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default Banner;
