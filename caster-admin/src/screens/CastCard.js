import React, { Component } from "react";
import { Card, Row, Col, Input, Button, Popover, Divider, message, Select, Modal } from "antd";
import moment from "moment";
import { GET_CAST_URL, GET_ONGOING_URL, GET_PENDING_URL, GET_CLOSED_URL, DELETE_CAST_URL, PUT_CASTANSWER_URL, GET_EARLY_CLOSED_URL } from "../utils/endpoints";
import Tab from "../components/Tab";
import axios from "axios";
import '../css/common.css';

class CastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      casts: [],
      ongoing: [],
      pending: [],
      closed: [],
      closedEarly: [],
      loading: false,
      searched: false,
      searchText: null,
      filtered: false,
      formVisible: false,
      filters: {},
      csvData: [["id", "email", "user name", "coffeeCoupons", "verificationType", "userStatus"]],
      entry: {},
      castId: '',
      selectedAnswer: '',
      deletePopUpVisible: false,
      castDeleteId: false
    };
  }

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  changeTab = (tab) => {
    this.setState({ tab });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch = () => {
    this.setState({ searched: true });

  }


  clearSearch = () => {
    this.setState({ searched: false, searchText: null });
  }



  componentDidMount() {
    this.getCastAll();
  }

  getCastAll = (searchText = null, filters = {}) => {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });



    axios
      .get(GET_CAST_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("Cast list", res.data.Body);
        this.setState({ casts: res.data.Body, loading: false });

      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_ONGOING_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("ongoing", res.data.Body);
        this.setState({ ongoing: res.data.Body, loading: false });

      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_PENDING_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("pending", res.data.Body);
        this.setState({ pending: res.data.Body, loading: false });

      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_CLOSED_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("closed", res.data.Body);
        this.setState({ closed: res.data.Body, loading: false });

      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_EARLY_CLOSED_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("closed early", res.data.Body);
        this.setState({ closedEarly: res.data.Body, loading: false });

      })
      .catch(err => {
        message.error(err.message);
      });
  }


  filterOnSearch = entry => {
    if (!this.state.searched) {
      return entry;
    } else {
      let filteredEntry = [];
      entry.map(item => {
        if (item.title.toString().toLowerCase().match(this.state.searchText.toLowerCase()) !== null) {
          filteredEntry.push(item);
        }
      })
      return filteredEntry;
    }
  }

  castCards = (casts) => {
    return (casts.map(record => {
      return (
        <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6)' }}>
          <Row>
            <Col span={4} style={{ margin: '0.5rem' }}>
              {(record.castImage)
                ? <img style={{ width: "120px", height: "150px" }} src={record.castImage} alt="cast_image" />
                : <div style={{ width: '120px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>}
            </Col>
            <Col span={14} style={{ margin: '0.5rem' }}>
              <Row style={{ padding: '0 0.5rem 1.2rem' }}><div><span style={{ fontSize: '1.5rem', fontWeight: 'bolder', fontStretch: '0.8rem', textTransform: 'capitalize' }}>{record.title}</span></div></Row>
              <Row style={{ padding: '0.5rem' }}>
                <Col span={8} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Type: </span><span style={{ textTransform: 'capitalize' }}>{record.castType}</span></Col>
                <Col span={16} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Tag: </span><span style={{ textTransform: 'capitalize' }}>{record.category}</span></Col>
              </Row>
              <Row style={{ padding: '0.5rem' }}>
                <Col span={12} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Open Time: </span><span>{moment(record.openTime).format("YYYY-MM-D ")}</span></Col>
                <Col span={12} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Close Time: </span><span>{moment(record.closeTime).format("YYYY-MM-D ")}</span></Col>
              </Row>
              <Row style={{ padding: '0.5rem' }}>
                <Col span={12} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Start Time: </span><span>{moment(record.startTime).format("YYYY-MM-D ")}</span></Col>
                <Col span={12} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Result Time: </span><span>{moment(record.resultTime).format("YYYY-MM-D ")}</span></Col>
              </Row>
              <Row style={{ padding: '0.5rem' }}>
                <Col span={8} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>1인당 최대보상액: </span><span>{record.maxReward}</span></Col>
                <Col span={8} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>총 상금금액: </span><span>{record.totalReward}</span></Col>
                <Col span={8} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>최소 투자금액: </span><span>{record.minBettingPoints}</span></Col>
              </Row>
              <Row style={{ padding: '0.5rem' }}>
                <Col span={4} style={{ fontSize: '0.7rem' }}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>정답</span></Col>
                <Col span={8} style={{ fontSize: '0.7rem' }}>
                  <Select value={(this.state.selectedAnswer === '' || this.state.castId !== record._id) ? record.castAnswer : this.state.selectedAnswer} style={{ width: '10rem' }} onChange={value => this.changeAnswer(record._id, value)}>
                    {this.answerOptions(record.answerType)}
                  </Select>
                </Col>
                <Col span={12} style={{ fontSize: '0.7rem' }}>
                  <Button type="primary" style={{ fontSize: '0.7rem' }} size="medium" onClick={() => this.submitAnswer()}>
                    정답제출
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={4} style={{ margin: '0.5rem' }}>
              <Button type="primary" icon='edit' style={{ fontSize: '0.7rem' }} size="medium" onClick={() => this.setCast(record)}>
                수정
              </Button>
              <Button type="danger" icon='delete' style={{ fontSize: '0.7rem', marginLeft: '0.5rem' }} size="medium" onClick={() => this.deleteCast(record._id)}>
                삭제
              </Button>
              <Modal style={{ top: '35%' }} mask={false} maskClosable={true} header={false} footer={false} visible={this.state.deletePopUpVisible} onOk={this.showDeletePopUp} onCancel={this.hideDeletePopUp}>
                <div style={{ height: '200px', width: '400px', margin: 'auto', padding: '0.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '100%', padding: '0 0 3.8rem', textAlign: 'center', fontSize: '1.5rem' }}>정말 삭제하시나요?</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <Button style={{ fontSize: '1.5rem', border: '0', color: '#FF7875' }} onClick={() => this.hideDeletePopUp()}>돌아가기</Button>
                    <Button style={{ fontSize: '1.5rem', border: '0', color: '#40A9FF' }} onClick={() => this.confirmDelete()}>삭제</Button>
                  </div>
                </div>
              </Modal>
            </Col>
          </Row>
        </Card>
      )
    }))
  }

  answerOptions = type => {
    if (type === 'ox') {
      let arr = ['O', 'X'];
      return arr.map((item, index) => {
        return (
          <Select.Option value={index + 1}>
            {item}
          </Select.Option>
        );
      })
    } else if (type === '3-choiced') {
      let arr = ['1', '2', '3'];
      return arr.map((item, index) => {
        return (
          <Select.Option value={index + 1}>
            {item}
          </Select.Option>
        );
      })
    }
    else {
      let arr = ['1', '2', '3', '4'];
      return arr.map((item, index) => {
        return (
          <Select.Option value={index + 1}>
            {item}
          </Select.Option>
        );
      })
    }
  }

  changeAnswer = (id, answer) => {
    this.setState({
      castId: id,
      selectedAnswer: answer
    });
  }

  submitAnswer = () => {
    const token = localStorage.getItem("token");
    if (this.state.selectedAnswer === '') {
      message.error('Nothing to change');
    }
    else {
      axios.put(PUT_CASTANSWER_URL, { ans: Number(this.state.selectedAnswer), castId: this.state.castId }, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          message.success("Cast answer updated successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.Body);
        })
    }
  }

  setCast = entry => {
    console.log('cast to edit---->', entry);

    localStorage.setItem('castToEdit', JSON.stringify(entry));

    window.location.href = '../cast/edit';
  }

  deleteCast = id => {
    if (this.state.deleteConfirmed) {
      const token = localStorage.getItem("token");
      axios.delete(DELETE_CAST_URL + '?id=' + id, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          message.success("Cast deleted successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response);
        })
    } else {
      this.showDeletePopUp();
      this.setState({ castDeleteId: id });
    }
  }

  showDeletePopUp = () => {
    this.setState({ deletePopUpVisible: true });
  }

  hideDeletePopUp = () => {
    this.setState({ deletePopUpVisible: false });
  }

  confirmDelete = async () => {
    await this.setState({ deleteConfirmed: true });

    this.deleteCast(this.state.castDeleteId);
  }

  render() {
    const {
      casts,
      ongoing,
      pending,
      closed,
      closedEarly,
      loading,

      searchText,
      searched,

      tab
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
          title={searched ? `Results for "${searchText}"` : "캐스트 카드 목록"}
          loading={loading}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="캐스트 타이틀"
                    onChange={(e) => this.handleChange(e)}
                    name="searchText"
                    value={searchText}
                    disabled={searched}
                  />
                  <br />
                  <br />
                  <Button
                    style={{ width: "100%" }}
                    type={searched ? "danger" : "primary"}
                    icon={searched ? "delete" : "search"}
                    onClick={searched ? this.clearSearch : this.submitSearch}
                    disabled={!!!searchText}
                  >
                    {searched ? "명확한 검색" : "검색"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button type="dashed" icon="search" style={{ margin: 5 }}>
                {searched ? searchText : "캐스트 타이틀"}
              </Button>
            </Popover>

          ]}
        >
          <div display="flex" flexDirection="row">
            <Button selected={tab === 0} text="" onClick={() => this.changeTab(0)} className='btn-transparent'>전체</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 1} text="" onClick={() => this.changeTab(1)} className='btn-transparent'>진행중</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 2} text="" onClick={() => this.changeTab(2)} className='btn-transparent'>마감</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 3} text=" 전" onClick={() => this.changeTab(3)} className='btn-transparent'>오픈</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 4} text="" onClick={() => this.changeTab(4)} className='btn-transparent'>조기마감</Button>
          </div>
          <div style={{ marginTop: "20px" }}>
            {tab === 0 && (
              this.castCards(this.filterOnSearch(casts))
            )}
            {tab === 1 && (
              this.castCards(this.filterOnSearch(ongoing))
            )}
            {tab === 2 && (
              this.castCards(this.filterOnSearch(closed))
            )}
            {tab === 3 && (
              this.castCards(this.filterOnSearch(pending))
            )}
            {tab === 4 && (
              this.castCards(this.filterOnSearch(closedEarly))
            )}
          </div>
        </Card>


      </div>
    );
  }
}
export default CastCard;
