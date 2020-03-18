import React, { Component, Fragment } from "react";
import { Menu, Empty, Pagination } from "antd";
import "./../components/Filters/Filters.css";
import "./../assets/css/BrandioCollaborationList.css";

// Import Components
import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Footer from "../components/Footer/Footer";
import Search from "../components/Search/Search";
import BrandioProductCard from "../components/BrandioProductCard/BrandioProductCard";
import Togglebutton from "../components/Common/Togglebutton";
import { collaborationAPI, itemAPI } from "../services/ApiService";
import Loader from "../screens/Loader";

const { SubMenu } = Menu;

class BrandioCollaborationList extends Component {
  static contextType = HeaderContext;

  state = {
    requests: [],
    sortType: null,
    countries: [],
    categories: [],
    loading: false,
    searchText: "",
    categoriesForFilter: [],
    popularSearches: [],
    current: 1,
    total: 0,
    ageRanges: []
  };

  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    this.setState({ loading: true });
    let categories = await itemAPI.getCategories();
    categories = [
      ...new Set(categories.data.Data.categories.map(bill => bill.category))
    ];
    this.setState({ categoriesForFilter: categories });
    const response = await collaborationAPI.collaborationRequest();
    this.setState({
      requests: response.data.Data.collaborationResult,
      popularSearches: response.data.Data.popularSearches,
      total: response.data.Data.totalDocuments,
      loading: false
    });
  }
  //Pagination
  onChange = async page => {
    //console.log(page);
    this.setState({
      current: page
    });
    const response = await collaborationAPI.collaborationRequest(
      null,
      null,
      null,
      null,
      null,
      page
    );
    this.setState({
      requests: response.data.Data.collaborationResult
    });
  };
  handleSearchTextChange = async e => {
    this.setState({ searchText: e.target.value });
    let searchText = e.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (searchText === "") {
        const response = await collaborationAPI.collaborationRequest();
        this.setState({ requests: response.data.Data.collaborationResult });
      } else {
        const response = await collaborationAPI.collaborationRequest(
          searchText
        );
        this.setState({ requests: response.data.Data.collaborationResult });
      }
    }, 300);
  };

  toggleSort = async type => {
    if (this.state.sortType === type) {
      this.setState({ sortType: null });
      const response = await collaborationAPI.collaborationRequest();
      this.setState({ requests: response.data.Data.collaborationResult });
    } else {
      this.setState({ sortType: type });
      const response = await collaborationAPI.collaborationRequest(null, type);
      this.setState({ requests: response.data.Data.collaborationResult });
    }
  };

  toggleFilter = async (type, value) => {
    let countries = this.state.countries;
    let categories = this.state.categories;
    let ageRanges = this.state.ageRanges;
    if (type === "country") {
      if (countries.indexOf(value) === -1) {
        countries.push(value);
        this.setState({ countries });
      } else {
        countries.splice(countries.indexOf(value), 1);
        this.setState({ countries });
      }
    } else if (type === "category") {
      if (categories.indexOf(value) === -1) {
        categories.push(value);
        this.setState({ categories });
      } else {
        categories.splice(categories.indexOf(value), 1);
        this.setState({ categories });
      }
    } else {
      if (ageRanges.indexOf(value) === -1) {
        ageRanges.push(value);
        this.setState({ ageRanges });
      } else {
        ageRanges.splice(ageRanges.indexOf(value), 1);
        this.setState({ ageRanges });
      }
    }

    if (
      countries.length === 0 &&
      categories.length === 0 &&
      ageRanges.length === 0
    ) {
      const response = await collaborationAPI.collaborationRequest();
      this.setState({ requests: response.data.Data.collaborationResult });
    } else {
      const countryString = countries.toString();
      const categoryString = categories.toString();
      const ageRangeString = ageRanges.toString();
      const response = await collaborationAPI.collaborationRequest(
        null,
        null,
        countryString,
        categoryString,
        ageRangeString,
        null
      );
      this.setState({ requests: response.data.Data.collaborationResult });
    }
  };

  renderCollaboration(requests) {
    return requests.map(list => (
      <div className="animated fadeInUp faster">
        <BrandioProductCard listData={list} />
      </div>
    ));
  }
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="animated fadeIn">
        <div className="container item--1 wrapper">
          <Header />
        </div>
        <div className="container item--2">
          <div className="wrapper">
            <Navbar />
          </div>
        </div>
        <div className="container item--3">
          <HeroSlider />
        </div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="wrapper search-box-container">
              <Search
                handleSearchTextChange={this.handleSearchTextChange}
                searchText={this.state.searchText}
                popularSearches={this.state.popularSearches}
              />
            </div>
            <div className="wrapper">
              <div className="brandio__collaboration-list">
                <div className="side-bar">
                  <Fragment>
                    <div className="filters">
                      <h5 className="filters__heading">
                        {i18n.t("navigation.collaboration", {
                          lng
                        })}
                      </h5>
                    </div>
                    <Menu
                      onClick={this.handleClick}
                      style={{ width: 256 }}
                      defaultSelectedKeys={["1"]}
                      defaultOpenKeys={["sub1"]}
                      mode="inline"
                    >
                      <SubMenu
                        key="sub1"
                        title={
                          <span>
                            <span>
                              {i18n.t("myOrder.Country", {
                                lng
                              })}
                            </span>
                          </span>
                        }
                      >
                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.artistCountry.korea",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleFilter("country", "KO")}
                          isActive={this.state.countries.indexOf("KO") !== -1}
                        />
                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.artistCountry.usa",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleFilter("country", "US")}
                          isActive={this.state.countries.indexOf("US") !== -1}
                        />
                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.artistCountry.japan",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleFilter("country", "JP")}
                          isActive={this.state.countries.indexOf("JP") !== -1}
                        />

                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.artistCountry.vietnam",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleFilter("country", "VN")}
                          isActive={this.state.countries.indexOf("VN") !== -1}
                        />
                      </SubMenu>

                      <SubMenu
                        key="sub2"
                        title={
                          <span>
                            <span>
                              {i18n.t("collaborationFilter.ageRange", {
                                lng
                              })}
                            </span>
                          </span>
                        }
                      >
                        <Togglebutton
                          title={`10${i18n.t("collaborationFilter.s", {
                            lng
                          })}`}
                          handleClick={() => this.toggleFilter("ageRange", 0)}
                          isActive={this.state.ageRanges.indexOf(0) !== -1}
                        />
                        <Togglebutton
                          title={`20${i18n.t("collaborationFilter.s", {
                            lng
                          })}`}
                          handleClick={() => this.toggleFilter("ageRange", 1)}
                          isActive={this.state.ageRanges.indexOf(1) !== -1}
                        />
                        <Togglebutton
                          title={`30${i18n.t("collaborationFilter.s", {
                            lng
                          })}`}
                          handleClick={() => this.toggleFilter("ageRange", 2)}
                          isActive={this.state.ageRanges.indexOf(2) !== -1}
                        />
                        <Togglebutton
                          title="40+"
                          handleClick={() => this.toggleFilter("ageRange", 3)}
                          isActive={this.state.ageRanges.indexOf(3) !== -1}
                        />
                      </SubMenu>
                      <SubMenu
                        key="sub3"
                        title={
                          <span>
                            <span>
                              {i18n.t("collaborationFilter.productCategory", {
                                lng
                              })}
                            </span>
                          </span>
                        }
                      >
                        {this.state.categoriesForFilter.map(category => (
                          <Togglebutton
                            title={category}
                            handleClick={() =>
                              this.toggleFilter("category", category)
                            }
                            isActive={
                              this.state.categories.indexOf(category) !== -1
                            }
                          />
                        ))}
                      </SubMenu>

                      <SubMenu
                        key="sub4"
                        title={
                          <span>
                            <span>
                              {i18n.t("collaborationFilter.short", {
                                lng
                              })}
                            </span>
                          </span>
                        }
                      >
                        <Togglebutton
                          title={i18n.t("collaborationFilter.shortBy.view", {
                            lng
                          })}
                          handleClick={() => this.toggleSort("views")}
                          isActive={this.state.sortType === "views"}
                          activeSort={this.state.sortType}
                          sortType="views"
                        />
                        <Togglebutton
                          title={i18n.t("collaborationFilter.shortBy.new", {
                            lng
                          })}
                          handleClick={() => this.toggleSort("new")}
                          isActive={this.state.sortType === "new"}
                          activeSort={this.state.sortType}
                          sortType="new"
                        />
                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.shortBy.lowestPrice",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleSort("pricelow")}
                          isActive={this.state.sortType === "pricelow"}
                          activeSort={this.state.sortType}
                          sortType="pricelow"
                        />
                        <Togglebutton
                          title={i18n.t(
                            "collaborationFilter.shortBy.highestPrice",
                            {
                              lng
                            }
                          )}
                          handleClick={() => this.toggleSort("pricehigh")}
                          isActive={this.state.sortType === "pricehigh"}
                          activeSort={this.state.sortType}
                          sortType="pricehigh"
                        />
                      </SubMenu>
                    </Menu>
                  </Fragment>
                </div>
                <div
                  className="brandio__collaboration-contentbox"
                  id="brandiocollaborationlist"
                >
                  <div className="request-inner">
                    {this.state.requests.length > 0 ? (
                      this.renderCollaboration(this.state.requests)
                    ) : (
                      <Empty
                        style={{ gridColumn: "span 3", paddingTop: "40px" }}
                        description="No collaboration requests right now, check back later."
                      />
                    )}
                  </div>
                  <div
                    className="brands-pagination-row"
                    style={{
                      textAlign: "center",
                      marginBottom: "20px"
                    }}
                  >
                    {this.state.requests.length > 0 ? (
                      <Pagination
                        current={this.state.current}
                        onChange={this.onChange}
                        total={this.state.total}
                        defaultPageSize={12}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container item--10">
              <div className="wrapper">
                <Footer />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default BrandioCollaborationList;
