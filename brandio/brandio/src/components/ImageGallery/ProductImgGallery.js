import React, { Component, Fragment } from "react";

class ProductImgGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      mainImg: 0
    };
  }
  componentDidMount() {
    this.setState({ images: this.props.images });
  }
  // render thumb
  thumbImg() {
    const { mainImg } = this.state;
    return this.props.images.map((image, index) => {
      return (
        <img
          src={image}
          alt={index}
          width="100"
          onClick={() => {
            this.upadteMainImage(index);
          }}
          className={
            index === mainImg ? "product-thumb-img active" : "product-thumb-img"
          }
        />
      );
    });
  }
  upadteMainImage(index) {
    this.setState({
      mainImg: index
    });
  }
  mainImage() {
    const { mainImg } = this.state;
    return this.props.images.map((image, i) => {
      return (
        <Fragment>
          {i === mainImg ? (
            <img src={image} alt="" className="product-large-img" />
          ) : null}
        </Fragment>
      );
    });
  }
  render() {
    return (
      <Fragment>
        <div class="product-large-img-box">{this.mainImage()}</div>
        <div class="product-thumb-img-box">{this.thumbImg()}</div>
      </Fragment>
    );
  }
}

export default ProductImgGallery;
