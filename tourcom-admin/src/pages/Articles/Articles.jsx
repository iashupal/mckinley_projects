/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { Card, Table, Input, Button, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { ARTICLE_LISTING_URL } from "../../utils/endpoints";
import moment from "moment";
import axios from "axios";

const tableData = [
  {
    key: "3",
    articleId: "3",
    articleTitle: `독일/베를린 ${moment().format("YYYY.MM.DD")} 20박21일 호스텔 지하철 우정여행`,
    articleAuthor: "관리자",
    articleDate: `${moment().format("YYYY.MM.DD")}`,
    articleReplyCount: 0,
    articleLikeCount: 0
  },
  {
    key: "2",
    articleId: "2",
    articleTitle: `대한민국/속초 ${moment().format("YYYY.MM.DD")} 1박2일 호텔 자가용 부부여행`,
    articleAuthor: "관리자",
    articleDate: `${moment()
      .add(1, "d")
      .format("YYYY.MM.DD")}`,
    articleReplyCount: 3,
    articleLikeCount: 13
  },
  {
    key: "1",
    articleId: "1",
    articleTitle: `미국/샌프란시스코 ${moment().format("YYYY.MM.DD")} 10박12일 민박 버스 우정여행`,
    articleAuthor: "관리자",
    articleDate: `${moment().format("YYYY.MM.DD")}`,
    articleReplyCount: 0,
    articleLikeCount: 41
  }
];

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchText: "",
      formVisible: false,
      isloading: false,
      data: null
    };

    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isloading: true });

    axios
      .get(ARTICLE_LISTING_URL, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        console.log("articleListing : ", res.data);

        let articlelists = res.data.map(articlelist => {
          return {
            id: articlelist.id,
            travelcity: articlelist.city,
            travelTransportation: articlelist.transportation,
            travelcountry: articlelist.country,
            travelaccomodation: articlelist.accomodation,
            traveltheme: articlelist.theme
          };
        });
        this.setState({ articlelists, isloading: false });
      });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

  deleteArticle(id) {}

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`키워드를 검색하세요`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          검색
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          초기화
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

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

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { formVisible, mode } = this.state;
    const tableColumns = [
      {
        title: "글 번호",
        dataIndex: "id",
        key: "id",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.articleId - b.articleId,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "제목",
        dataIndex: "travelcity",
        key: "travelcity",
        ...this.getColumnSearchProps("travelcity")
      },
      {
        title: "작성자",
        dataIndex: "travelTransportation",
        key: "travelTransportation"
      },
      {
        title: "작성자",
        dataIndex: "travelcountry",
        key: "travelcountry"
      },
      {
        title: "작성자",
        dataIndex: "travelaccomodation",
        key: "travelaccomodation"
      },
      {
        title: "작성자",
        dataIndex: "traveltheme",
        key: "traveltheme"
      },

      // {
      //   title: "작성일",
      //   dataIndex: "travelcountry",
      //   key: "articleDate",
      //   sorter: (a, b) => new Date(a.articleDate) - new Date(b.articleDate)
      // },

      // {
      //   title: "댓글",
      //   dataIndex: "articleReplyCount",
      //   key: "articleReplyCount",
      //   sorter: (a, b) => a.articleReplyCount - b.articleReplyCount
      // },
      // {
      //   title: "좋아요",
      //   dataIndex: "articleLikeCount",
      //   key: "articleLikeCount",
      //   sorter: (a, b) => a.articleLikeCount - b.articleLikeCount
      // },

      {
        title: "Actions",
        key: "actions",
        render: (text, id) => (
          <span>
            {/* <Button icon="edit" size="small" onClick={() => this.showEditForm(record)}>
              Edit
            </Button> */}
            {/* <Divider type="vertical" /> */}
            <Link to={`/article/${id.id}`}>
              <Button size="small">Detail</Button>
            </Link>
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" onClick={() => this.deleteArticle(id)}>
              Delete
            </Button>
          </span>
        )
      }
    ];
    return (
      <div>
        <Card title="여행 상품 글">
          <Table
            dataSource={this.state.articlelists}
            columns={tableColumns}
            pagination={{
              pageSize: 30
            }}
            loading={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  // this.props.history.push(`/article/${record.articleId}`);
                }, // click row
                onDoubleClick: event => {}, // double click row
                onContextMenu: event => {}, // right button click row
                onMouseEnter: event => {}, // mouse enter row
                onMouseLeave: event => {} // mouse leave row
              };
            }}
            // rowKey="uid"
          />
        </Card>
        {/* <ArticleForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} /> */}
      </div>
    );
  }
}

export default Articles;
