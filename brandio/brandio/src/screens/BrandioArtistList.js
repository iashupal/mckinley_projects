import React, { Component, Fragment } from "react";
import { Menu, Empty, Pagination } from "antd";
import "./../components/Filters/Filters.css";
import "./../assets/css/BrandioArtistList.css";
import { artistAPI } from "../services/ApiService";

// Import Components
import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Footer from "../components/Footer/Footer";
import Search from "../components/Search/Search";
import BrandioArtistListProductCard from "../components/BrandioArtistListProductCard/BrandioArtistListProductCard";
import Togglebutton from "../components/Common/Togglebutton";
import Loader from "./Loader";

const { SubMenu } = Menu;

class BrandioArtistList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      lng: "en",
      artist: [],
      countries: [],
      loading: false,
      searchText: "",
      popularSearches: [],
      current: 1,
      total: 0,
      countryWise: {}
    };
  }

  static contextType = HeaderContext;

  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    this.setState({ loading: true });
    const artistList = await artistAPI.getArtists();
    this.setState({
      artist: artistList.data.Data.artists,
      popularSearches: artistList.data.Data.popularSearches,
      loading: false,
      total: artistList.data.Data.totalDocuments,
      countryWise: artistList.data.Data.countryWiseCount
    });
    console.log("artist list", artistList);
  }
  //Pagination
  onChange = async page => {
    this.setState({
      current: page
    });
    const artistList = await artistAPI.getArtists(null, null, page);
    this.setState({
      artist: artistList.data.Data.artists
    });
  };
  handleSearchTextChange = async e => {
    this.setState({ searchText: e.target.value });
    let searchText = e.target.value; // this is the search text
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (searchText === "") {
        const artistList = await artistAPI.getArtists();
        this.setState({ artist: artistList.data.Data.artists });
      } else {
        const artistList = await artistAPI.getArtists(searchText);
        this.setState({ artist: artistList.data.Data.artists });
      }
    }, 300);
  };

  toggleFilter = async value => {
    let countries = this.state.countries;
    if (countries.indexOf(value) === -1) {
      countries.push(value);
      this.setState({ countries });
    } else {
      countries.splice(countries.indexOf(value), 1);
      this.setState({ countries });
    }

    if (countries.length === 0) {
      const response = await artistAPI.getArtists();
      this.setState({ artist: response.data.Data.artists });
    } else {
      const countryString = countries.toString();
      const response = await artistAPI.getArtists(null, countryString);
      this.setState({ artist: response.data.Data.artists });
    }
  };

  randerArtist() {
    console.log("artist", this.state.artist);
    if (this.state.artist.length === 0) {
      return <Empty style={{ gridColumn: "span 3", paddingTop: "40px" }} />;
    } else {
      return this.state.artist.map(artist => (
        <div className="animated fadeInUp faster">
          <BrandioArtistListProductCard artist={artist} />
        </div>
      ));
    }
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
            <div className="wrapper search-box-container brandio-artistlist">
              <Search
                handleSearchTextChange={this.handleSearchTextChange}
                searchText={this.state.searchText}
                popularSearches={this.state.popularSearches}
              />
            </div>
            <div className="wrapper">
              <div className="brandio__artist-list">
                <div className="side-bar">
                  <Fragment>
                    <div className="filters">
                      <h5 className="filters__heading">
                        {i18n.t("brandioArtist.artist", { lng })}
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
                      <SubMenu
                        key="sub1"
                        title={
                          <span>
                            <span>
                              {i18n.t("brandioArtist.artistCountry", {
                                lng
                              })}
                            </span>
                          </span>
                        }
                      >
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.korea", {
                              lng
                            }) + ` (${this.state.countryWise["KR"] || 0})`
                          }
                          handleClick={() => this.toggleFilter("KR")}
                          isActive={this.state.countries.indexOf("KR") !== -1}
                        />
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.usa", {
                              lng
                            }) + ` (${this.state.countryWise["US"] || 0})`
                          }
                          handleClick={() => this.toggleFilter("US")}
                          isActive={this.state.countries.indexOf("US") !== -1}
                        />
                        <Togglebutton
                          title={
                            i18n.t("collaborationFilter.artistCountry.japan", {
                              lng
                            }) + ` (${this.state.countryWise["JP"] || 0})`
                          }
                          handleClick={() => this.toggleFilter("JP")}
                          isActive={this.state.countries.indexOf("JP") !== -1}
                        />

                        <Togglebutton
                          title={
                            i18n.t(
                              "collaborationFilter.artistCountry.vietnam",
                              {
                                lng
                              }
                            ) + ` (${this.state.countryWise["VN"] || 0})`
                          }
                          handleClick={() => this.toggleFilter("VN")}
                          isActive={this.state.countries.indexOf("VN") !== -1}
                        />
                      </SubMenu>
                    </Menu>
                  </Fragment>
                </div>
                <div
                  className="brandio__artist-contentbox"
                  id="brandioartistlist"
                >
                  {" "}
                  <div className="artist-inner">{this.randerArtist()}</div>
                  <div
                    className="brands-pagination-row"
                    style={{
                      textAlign: "center",
                      marginBottom: "20px"
                    }}
                  >
                    {this.state.artist.length > 0 ? (
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

export default BrandioArtistList;
