import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Empty, Button, Pagination } from "antd";
import "./../components/Filters/Filters.css";
import "./../assets/css/FandioBrandList.css";
import Img from "react-image";
// Import Components
import Header from "../components/Header/Header";
import Navbar from "./../components/Navbar/Navbar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Footer from "../components/Footer/Footer";
import Search from "./../components/Search/Search";
import PcardBrand from "./../components/ProductCard/PcardBrand";
import Togglebutton from "../components/Common/Togglebutton";
import HeaderContext from "./../context/HeaderContext";
import Loader from "../screens/Loader";

import { brandsAPI } from "../services/ApiService";

const { SubMenu } = Menu;

class BrandioBrandList extends Component {
  static contextType = HeaderContext;

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      brands: [],
      serachText: "",
      countries: [],
      categories: [],
      loading: false,
      searchText: "",
      popularSearches: [],
      current: 1,
      total: 0,
      countryWiseCount: {}
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const brands = await brandsAPI.getBrands();
    this.setState({
      brands: brands.data.Data.brands,
      popularSearches: brands.data.Data.popularSearches,
      loading: false,
      total: brands.data.Data.totalDocuments,
      countryWiseCount: brands.data.Data.countryWiseCount
    });
  }

  //Pagination
  onChange = async page => {
    this.setState({
      current: page
    });
    const brands = await brandsAPI.getBrands(null, null, page);
    this.setState({
      brands: brands.data.Data.brands,
      popularSearches: brands.data.Data.popularSearches,
      isLoading: false
    });
  };
  handleSearchTextChange = async e => {
    this.setState({ searchText: e.target.value });
    var searchText = e.target.value; // this is the search text
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (searchText === "") {
        const brands = await brandsAPI.getBrands();
        this.setState({ brands: brands.data.Data.brands });
      } else {
        const brands = await brandsAPI.getBrands(searchText);
        this.setState({ brands: brands.data.Data.brands });
      }
    }, 300);
  };

  toggleFilter = async (type, value) => {
    let countries = this.state.countries;
    let categories = this.state.categories;
    if (type === "country") {
      if (countries.indexOf(value) === -1) {
        countries.push(value);
        this.setState({ countries });
      } else {
        countries.splice(countries.indexOf(value), 1);
        this.setState({ countries });
      }
    } else {
      if (categories.indexOf(value) === -1) {
        categories.push(value);
        this.setState({ categories });
      } else {
        categories.splice(categories.indexOf(value), 1);
        this.setState({ categories });
      }
    }

    if (countries.length === 0 && categories.length === 0) {
      const response = await brandsAPI.getBrands();
      this.setState({ brands: response.data.Data.brands });
    } else {
      const countryString = countries.toString();
      const response = await brandsAPI.getBrands(null, countryString);
      this.setState({ brands: response.data.Data.brands });
    }
  };

  randerBrands(brands) {
    if (brands.length === 0) {
      return (
        <Empty
          style={{ gridColumn: "span 3", marginTop: "50px" }}
          description="There are no items at the moment, check back later!"
        >
          <Link to="/brands/new">
            <Button
              style={{
                backgroundColor: "var(--han-purple)",
                color: "white",
                border: "none"
              }}
            >
              Launch Brand
            </Button>
          </Link>
        </Empty>
      );
    } else {
      if (this.props.type === "homepage") {
        return brands.map(brand => (
          <div className="brand-cards brands-cards-homepage animated fadeInUp faster">
            <a
              href={`https://fandio.collartt.com/${brand.url}`}
              className="removelinkcss"
            >
              <Img
                src={[
                  brand.img_logo,
                  require("../assets/images/brand-logo-4.svg")
                ]}
              />
            </a>
          </div>
        ));
      } else {
        return brands.map(brand => (
          <div className="brand-cards animated fadeInUp faster">
            <a
              href={`https://fandio.collartt.com/${brand.url}`}
              className="removelinkcss"
            >
              <PcardBrand name={brand.name_eng} path={brand.img_logo} />
            </a>
          </div>
        ));
      }
    }
  }
  render() {
    const { lng, i18n } = this.context;
    if (this.props.type === "homepage") {
      return this.randerBrands(this.state.brands);
    } else {
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
          {this.state.loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="container item--3">
                <HeroSlider />
              </div>
              <div className="wrapper search-box-container">
                <Search
                  handleSearchTextChange={this.handleSearchTextChange}
                  searchText={this.state.searchText}
                  popularSearches={this.state.popularSearches}
                />
              </div>
              <div className="wrapper">
                <div className="fandio__brand-list">
                  <div className="side-bar">
                    <Fragment>
                      <div className="filters">
                        <h5 className="filters__heading">
                          {i18n.t("navigation.brand", {
                            lng
                          })}{" "}
                          <label>({this.state.total})</label>
                        </h5>
                      </div>
                      <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                      >
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.korea", {
                              lng
                            }) + ` (${this.state.countryWiseCount.KR || 0})`
                          }
                          handleClick={() => this.toggleFilter("country", "KR")}
                          isActive={this.state.countries.indexOf("KR") !== -1}
                        />
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.usa", {
                              lng
                            }) + ` (${this.state.countryWiseCount.US || 0})`
                          }
                          handleClick={() => this.toggleFilter("country", "US")}
                          isActive={this.state.countries.indexOf("US") !== -1}
                        />
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.japan", {
                              lng
                            }) + ` (${this.state.countryWiseCount.JP || 0})`
                          }
                          handleClick={() => this.toggleFilter("country", "JP")}
                          isActive={this.state.countries.indexOf("JP") !== -1}
                        />
                        <Togglebutton
                          title={
                            i18n.t(
                              "collaborationFilter.artistCountry.vietnam",
                              {
                                lng
                              }
                            ) + ` (${this.state.countryWiseCount.VN || 0})`
                          }
                          handleClick={() => this.toggleFilter("country", "VN")}
                          isActive={this.state.countries.indexOf("VN") !== -1}
                        />
                      </Menu>
                    </Fragment>
                  </div>
                  <div
                    className="fandio__brand-contentbox"
                    id="brandiobrandlist"
                  >
                    <div className="brand-inner">
                      {this.randerBrands(this.state.brands)}
                    </div>
                    <div
                      className="brands-pagination-row"
                      style={{
                        textAlign: "center",
                        marginBottom: "20px"
                      }}
                    >
                      {this.state.brands.length > 0 ? (
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
}

export default BrandioBrandList;
