import React, { Component } from "react";

import HeaderContext from './../../context/HeaderContext';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import ProductHeader from '../ProductList/ProductHeader';
import UserCard from './../UserCard/UserCard';
import SingleQuote from './../QuoteList/SingleQuote';
import artist1 from "./../../assets/images/artist-1.svg";
import brandioProducts from '../../utils/dummy/brandio';
import personProfile from '../../utils/dummy/personProfile';

class Brandio extends Component {
  static contextType = HeaderContext

  componentDidMount() {
    this.context.headerNameHandler('Brandio');
  }

  render() {
    return (
      <div className="div__sub">
        <UserCard
          personAvatar={personProfile.profilePic}
          title={personProfile.title}
          name={personProfile.name}
          description={personProfile.description}
          followers={personProfile.followers}
          following={personProfile.following}
        />
        <div className="div__menu__product">
          <CategoryMenu />
          <div className="bradio__div__header__products">
            {brandioProducts.map((category, index) => {
              return (
                <div key={`brandio-category-${index}`} className={`div__menu__product__header ${index !== 0 ? 'menu__product__header--padding' : ''}`}>
                  <ProductHeader
                    title={category.name}
                    description={category.description}
                    imageSrc={category.image}
                  />
                  <div className="main__product__div illustation__div">
                    {category.products.map((product, productIndex) => {
                      return (
                        <SingleQuote
                          key={`brandio-product-${index}-${productIndex}`}
                          logoImageSrc={product.brandIcon}
                          brand={product.brandName}
                          quoteDescription={product.quoteContent}
                          time={product.timeLeft}
                          personName={product.personName}
                          profileImage={product.personImage}
                          collaborationPercentage={product.collaborationSharePercent}
                          productName={product.productType}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Brandio;