import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Card, Popover, Input, InputNumber } from "antd";
import axios from "axios";
import { USERLIST_URL } from "../../utils/endpoints";
import UserForm from "../../components/UserForm/UserForm";

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
      filters: {}
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
    this.showEditForm = this.showEditForm.bind(this);

    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country"
      },
      {
        title: "DOB",
        dataIndex: "dob",
        key: "dob"
      },
      {
        title: "UserLevel",
        dataIndex: "userlevel",
        key: "userlevel"
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Affiliation",
        dataIndex: "affiliation",
        key: "affiliation"
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <Button icon="edit" size="small" onClick={() => this.showEditForm(record)}>
              Edit
            </Button>
            {!record.isConfirmed && (
              <Fragment>
                <Divider type="vertical" />
                <Button icon="check" size="small" onClick={() => this.confirmUser(record.id, record.detailId)}>
                  Confirm
                </Button>
              </Fragment>
            )}
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" onClick={() => this.deleteUser(record.id)}>
              Delete
            </Button>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers(searchText = null, filters = {}) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `&${key}=${filters[key]}`;
      }
    });

    let searchString = "";
    if (searchText) {
      searchString = `&search=${searchText}`;
    }

    axios
      .get(USERLIST_URL + searchString, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        console.log("userlist : ", res.data);
        let users = res.data.map(user => {
          return {
            key: user._id,
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.mobile,
            userlevel: user.userlevel,
            country: user.country,
            affiliation: user.affiliation,
            dob: user.dob,
            fullName: user.fullName,
            firstName: user.firstName,
            lastName: user.lastName,
            isConfirmed: user.isConfirmed
          };
        });
        this.setState({ users, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

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
      case "dob":
        filters.dob = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

  confirmUser(userId, detailId) {
    // axios
    //     .put(
    //         PUT_PATIENTS_URL,
    //         { id: doctorId, detailId, isConfirmed: true, userType: "doctor" },
    //         { headers: { "x-access-token": localStorage.getItem("token") } }
    //     )
    //     .then(res => window.location.reload())
    //    .catch(err => console.log(err));
  }

  deleteUser(id) {
    // Axios.delete(
    //     `https://sapi.mckinleyrice.com/api/v1/user?userId=${id}&userType=doctor`,
    //     {
    //         headers: { "x-access-token": localStorage.getItem("token") }
    //     }
    // )
    //     .then(res => window.location.reload())
    //     .catch(err => console.log(err));
  }

  render() {
    const { users, loading, formVisible, searchText, searched, filtered, filters, mode, entry } = this.state;
    return (
      <div>
        <Card
          size="small"
          title={searched ? `Results for "${searchText}"` : "Userlist"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter user name/email"
                    onChange={this.handleChange}
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
                    {searched ? "Clear search" : "Search"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button type="dashed" icon="search" style={{ margin: 5 }} disabled={filtered}>
                {searched ? searchText : "Search User"}
              </Button>
            </Popover>,
            <Popover
              content={
                <div>
                  <InputNumber
                    placeholder="dob"
                    style={{ width: "100%" }}
                    onChange={value => this.updateFilter("dob", value)}
                    value={this.state.filters.dob}
                    disabled={filtered}
                  />
                  <br />
                  <br />
                </div>
              }
              placement="bottom"
            >
              <Button icon="filter" style={{ margin: 5 }} disabled={searched}>
                Filter
              </Button>
            </Popover>,
            <Button type="primary" icon="plus" style={{ margin: 5 }} onClick={this.showForm}>
              New User
            </Button>
          ]}
        >
          <Table
            dataSource={users}
            columns={this.columns}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
        <UserForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default UserList;
