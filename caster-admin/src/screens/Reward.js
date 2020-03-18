import React, { Component } from "react";
import { Card, Row, Input, Button } from "antd";
// import { Button } from "antd/lib/radio";

class Reward extends Component {
  render() {
    return (
      <Card title='리워드 관리' headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
        <Card>
          <Row style={{ marginBottom: '0.8rem' }}><label>예측 리그 (2019. 09. 01  24:00:00)</label></Row>
          <Row>
            <Input placeholder={'마이크 입력'} style={{ width: '300px' }} />
            <Input placeholder={'텍스트 입력'} style={{ width: '300px', marginLeft: '0.8rem' }} />
            <Button type="primary" style={{ marginLeft: '1.2rem' }}>시작</Button>
            <Button type="danger" style={{ marginLeft: '0.8rem' }}>종료</Button>
          </Row>
          <Row style={{ margin: '1.2rem 0 0.8rem' }}><label>예측 리그 > 일괄 지급</label></Row>
          <Row>
            <Input placeholder={'마이크 입력'} style={{ width: '300px' }} />
            <Input placeholder={'텍스트 입력'} style={{ width: '300px', marginLeft: '0.8rem' }} />
            <Button type="primary" style={{ marginLeft: '1.2rem' }}>확인</Button>
          </Row>
        </Card>
      </Card>
    )
  }
}

export default Reward;


// import React, { Component } from "react";
// import { Table, Button, message, Card, Popover, Input } from "antd";
// import axios from "axios";
// import moment from "moment";
// import { GET_VIBES_URL } from "../utils/endpoints";
// import Axios from "axios";

// class Reward extends Component {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         title: "User Name",
//         dataIndex: "username",
//         key: "vibes[0].username",
//         render: (text, record) => <span>{record.ownerInfo[0].username ? record.ownerInfo[0].username : ""}</span>
//       },
//       {
//         title: "Date",
//         dataIndex: "createdAt",
//         key: "createdAt",
//         render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D ")}</span>
//       },
//       {
//         title: "Image",
//         dataIndex: "url",
//         key: "vibes[0].photos[0]",
//         render: (text, record) => (
//           <img style={{ width: "200px", height: "100px" }} src={record.photos[0].url} alt="vibe image" />
//         )
//       },
//       {
//         title: "Actions",
//         key: "actions",
//         render: (text, record) => (
//           <span>
//             <Button type="danger" icon="delete" size="small" onClick={() => this.deleteVibes(record._id)}>
//               Delete
//             </Button>
//           </span>
//         )
//       }
//     ];
//     this.state = {
//       vibes: [],
//       loading: false,
//       searched: false,
//       searchText: null,
//       filtered: false,
//       csvData: [["id", "date time", "email"]]
//     };
//     this.submitFilters = this.submitFilters.bind(this);
//     this.clearFilters = this.clearFilters.bind(this);
//     this.updateFilter = this.updateFilter.bind(this);
//     this.getVibes = this.getVibes.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.submitSearch = this.submitSearch.bind(this);
//     this.clearSearch = this.clearSearch.bind(this);
//   }

//   componentDidMount() {
//     this.getVibes();
//   }

//   getVibes(searchText = null, filters = {}) {
//     const token = localStorage.getItem("token");
//     this.setState({ loading: true });

//     let filterString = "";
//     Object.keys(filters).map(key => {
//       if (filters[key]) {
//         filterString += `?${key}=${filters[key]}`;
//       }
//     });

//     console.log(filterString);

//     let searchString = "";
//     if (searchText) {
//       searchString = `?search=${searchText}`;
//     }

//     console.log(searchString);

//     axios
//       .get(GET_VIBES_URL + searchString + filterString, {
//         headers: {
//           Authorization: token
//         }
//       })
//       .then(res => {
//         console.log("Vibes", res.data.allVibes);

//         this.setState({ vibes: res.data.allVibes, loading: false });
//       })
//       .catch(err => {
//         message.error(err.message);
//       });
//   }
//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   submitSearch() {
//     this.setState({ searched: true });
//     this.getVibes(this.state.searchText);
//   }

//   submitFilters() {
//     this.setState({ filtered: true });
//     this.getVibess(this.state.filters);
//   }
//   clearSearch() {
//     this.setState({ searched: false, searchText: null });
//     this.getVibes();
//   }
//   clearFilters() {
//     this.setState({ filtered: false, filters: {} });
//     this.getVibes();
//   }

//   updateFilter(type, value) {
//     let filters = this.state.filters;
//     switch (type) {
//       case "status":
//         filters.userStatus = value;
//         break;
//       default:
//         console.log("Error");
//     }
//     this.setState({ filters: filters });
//   }

//   deleteVibes(_id) {
//     const token = localStorage.getItem("token");
//     Axios.delete(`https://outlier.mckinleyrice.com/admin/moment-vibe?vibeId=${_id}`, {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then(res => window.location.reload())
//       .catch(err => console.log(err));
//   }

//   render() {
//     const { vibes, loading, searchText, searched, filtered, filters } = this.state;
//     return (
//       <div>
//         <Card
//           size="small"
//           title={searched ? `Results for "${searchText}"` : "Vibes"}
//           extra={[
//             <Popover
//               content={
//                 <div>
//                   <Input
//                     placeholder="Enter vibes username/email"
//                     onChange={this.handleChange}
//                     name="searchText"
//                     value={searchText}
//                     disabled={searched}
//                   />
//                   <br />
//                   <br />
//                   <Button
//                     style={{ width: "100%" }}
//                     type={searched ? "danger" : "primary"}
//                     icon={searched ? "delete" : "search"}
//                     onClick={searched ? this.clearSearch : this.submitSearch}
//                     disabled={!!!searchText}
//                   >
//                     {searched ? "Clear search" : "Search"}
//                   </Button>
//                 </div>
//               }
//               placement="bottom"
//             >
//               <Button type="dashed" icon="search" style={{ margin: 5 }} disabled={filtered}>
//                 {searched ? searchText : "Search Vibes"}
//               </Button>
//             </Popover>
//           ]}
//         >
//           <Table
//             dataSource={vibes}
//             columns={this.columns}
//             size="small"
//             pagination={{
//               pageSize: 10
//             }}
//             loading={loading}
//           />
//         </Card>
//       </div>
//     );
//   }
// }

// export default Reward;