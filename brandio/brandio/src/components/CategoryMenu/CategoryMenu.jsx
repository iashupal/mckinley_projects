import React, { Component } from "react";
import "./CategoryMenu.css";

import { Link } from "react-router-dom";
import categories from "../../utils/dummy/category";

class CategoryMenu extends Component {
  constructor() {
    super();
    this.state = {
      ActiveClass: 0
    };
  }
  ChangeMenu = (e, index) => {
    e.preventDefault();
    this.setState({
      ActiveClass: index
    });
  };
  render() {
    const { ActiveClass } = this.state;

    return (
      <div className="div__category__menu">
        <div className="category__title">CATEGORY</div>
        <div className="div__product__section">
          <ul>
            {categories.map((category, index) => {
              return (
                <li>
                  <Link
                    to="#"
                    className={`div__menu__title ${
                      ActiveClass === index ? "div__selected" : ""
                    }`}
                    onClick={e => this.ChangeMenu(e, index)}
                  >
                    {category.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default CategoryMenu;
