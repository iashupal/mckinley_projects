import React, { useContext } from "react";
import "./SelectProduct.css";
import HeaderContext from "./../../context/HeaderContext";

class SelectProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSide: this.props.product.printableSides
    };
  }

  static contextType = HeaderContext;
  componentDidMount() {}
  updateSide = side => {
    var array = [...this.state.selectedSide]; // make a separate copy of the array
    var index = array.indexOf(side);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedSide: array }, () =>
        this.props.selectedSides(this.state.selectedSide)
      );
    } else {
      this.setState(
        prevState => ({
          selectedSide: [...prevState.selectedSide, side]
        }),
        () => this.props.selectedSides(this.state.selectedSide)
      );
    }
  };
  componentDidMount() {}
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="selectproduct">
        <div className="bpcreate__productcontentbox">
          <div className="bpcreate__productbox">
            <div>
              <img
                src={
                  this.props.product.frontImg === ""
                    ? require("../../assets/images/product-photo-3.svg")
                    : this.props.product.frontImg
                }
                alt="blank"
                className="bpcreate__productbox--product"
              />
            </div>
          </div>
          <div className="bpcreate__productinfobox">
            <div className="bpcreate__productinfo">
              <label className="bpcreate__productinfo--label">
                {i18n.t("brandioCreateProduct.cost", {
                  lng
                })}
              </label>
              <span className="bpcreate__productinfo--value">
                {this.props.product.price} 원
              </span>
            </div>
            <div className="bpcreate__productinfo">
              <label className="bpcreate__productinfo--label">
                {i18n.t("brandioCreateProduct.color", {
                  lng
                })}
              </label>
              <span className="bpcreate__productinfo--value">
                {this.props.product.colors.map((color, index) => (
                  <span>{color},&nbsp;</span>
                ))}
              </span>
            </div>
            <div className="bpcreate__productinfo">
              <label className="bpcreate__productinfo--label">
                {i18n.t("brandioCollaborationCard.size", {
                  lng
                })}
              </label>
              <span className="bpcreate__productinfo--value">
                {this.props.product.sizes.map((size, index) => (
                  <span style={{ textTransform: "uppercase" }}>
                    {size},&nbsp;
                  </span>
                ))}
              </span>
            </div>

            <div className="bpcreate__productinfo">
              <label className="bpcreate__productinfo--label">
                {i18n.t("brandioCreateProduct.noOfPages", {
                  lng
                })}
              </label>
              <span className="bpcreate__productinfo--value">
                {this.props.product.printableSides.map((side, index) => (
                  <button
                    className={
                      this.state.selectedSide.indexOf(side) !== -1
                        ? "btn-round-tertitary-outline m10"
                        : "btn-round-outline m10"
                    }
                    onClick={e => this.updateSide(side)}
                  >
                    {side}
                  </button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectProduct;
