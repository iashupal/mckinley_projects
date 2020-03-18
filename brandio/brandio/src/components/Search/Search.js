import React from "react";
import "./../Search/Search.css";
import HeaderContext from "./../../context/HeaderContext";
import { Tag } from "antd";

class Search extends React.Component {
  static contextType = HeaderContext;

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true
    };
  }

  render() {
    const { lng, i18n } = this.context;
    const { handleSearchTextChange, popularSearches } = this.props;
    return (
      <div className="search">
        <div className="search__box">
          <input
            type="text"
            placeholder={i18n.t("search.placeholder", { lng })}
            className="search__box--field"
            onChange={e => handleSearchTextChange(e)}
            value={this.props.searchText}
          />
          <img
            src={require("./../../assets/images/icon-search.svg")}
            alt="Search"
            width="14px"
            height="15px"
            className="search-icon"
            style={{ cursor: "pointer" }}
          />
          <button
            type="button"
            className="btn-remove"
            onClick={() => handleSearchTextChange({ target: { value: "" } })}
          >
            <img
              src={require("./../../assets/images/icon-remove.svg")}
              alt="Remove"
              width="14px"
              height="15px"
              style={{ cursor: "pointer" }}
            />
          </button>
        </div>
        <br />
        <div className="search__tags-box">
          <ul className="search__list">
            <li className="search__list--item">
              <a href="/">{i18n.t("search.popular", { lng })}</a>
            </li>
            {popularSearches.map(tag => (
              <li className="search__list--item">
                <Tag
                  onClick={() =>
                    handleSearchTextChange({ target: { value: tag.name } })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {tag.name}
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
