import React, { useContext } from "react";
import "./EstimatedRevenue.css";
import HeaderContext from "./../../context/HeaderContext";

class EstimatedRevenue extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = HeaderContext;
  render() {
    const { lng, i18n } = this.context;
    let printcharge = 0;
    let fandioCost = 0;
    let profit = 0;
    let collaboraterFee = 0;
    if (this.props.commodityPrice !== null) {
      collaboraterFee =
        (parseInt(this.props.commodityPrice) * this.props.collaboraterFee) /
        100;
      printcharge = parseInt(this.props.selectedSides) * 4000;
      fandioCost = (parseInt(this.props.commodityPrice) * 30) / 100;
      profit =
        parseInt(this.props.commodityPrice) -
        (this.props.whiteItem.price +
          printcharge +
          fandioCost +
          collaboraterFee);
      this.props.setProfitData(profit);
    }
    return (
      <div className="estimatedrevenue">
        <table id="pricetableone" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.commodityPrice", {
                  lng
                })}
              </td>
              <td colSpan="2" className="text-right color-tertiary">
                {this.props.commodityPrice ? this.props.commodityPrice : 0}
              </td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.productPrice", {
                  lng
                })}{" "}
                -
              </td>
              <td colSpan="2" className="text-right color-tertiary">
                -{this.props.whiteItem.price}
              </td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.noOfPages", {
                  lng
                })}{" "}
                - <strong>{this.props.whiteItem.printableSides.lenght}</strong>
              </td>
              <td colSpan="2"></td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.printingExtra", {
                  lng
                })}{" "}
                - <strong> 4,000</strong>
              </td>
              <td className="text-right">
                <span className="color-tertiary"> - 4,000</span>
                <span className="color-primary">에서</span>
              </td>
              <td className="text-right">
                <span className="color-tertiary"> - {printcharge}</span>
                <span className="color-primary">에서</span>
              </td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.fendioFee", {
                  lng
                })}{" "}
                - <strong>30%</strong>
              </td>
              <td className="text-right">
                <span className="color-tertiary"> - {fandioCost}</span>
                <span className="color-primary">에서</span>
              </td>
              <td className="text-right">
                <span className="color-tertiary"> - {fandioCost} </span>
                <span className="color-primary">에서</span>
              </td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.collFee", {
                  lng
                })}{" "}
                - <strong>{this.props.collaboraterFee}</strong>
              </td>
              <td className="text-right">
                <span className="color-tertiary">- {collaboraterFee}</span>
                <span className="color-primary">에서</span>
              </td>
              <td className="text-right">
                <span className="color-tertiary"> - {collaboraterFee}</span>
                <span className="color-primary">에서</span>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <hr className="greyborder" />
              </td>
            </tr>
            <tr>
              <td className="text-left color-primary">
                {i18n.t("brandioCreateProduct.estimatRevnue", {
                  lng
                })}
              </td>
              <td className="text-right"></td>
              <td className="text-right">
                <span className="color-tertiary"> {profit} </span>
                <span className="color-primary">에서</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EstimatedRevenue;
