import React, { Component } from "react";
import "./../BestSellers/BestSellers.css";
import { commmonAPI } from "../../services/ApiService";

//Import Components
import ProductCard from "./../ProductCard/ProductCard";

class BestSellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            collaborationProduct: []
        };
    }
    async componentDidMount() {
        const collProduct = await commmonAPI.bestSeller();
        if (collProduct.status === 200) {
            this.setState({
                collaborationProduct: collProduct.data.Data,
                loading: true
            });
        }
    }
    renderProduct() {
        let count = 1;
        return this.state.collaborationProduct.map((product, index) => {
            if (count < 9 && product.product_type !== "illustration") {
                count++;
                return (
                    <ProductCard
                        product={product}
                        key={product.id}
                        showArtist={true}
                        brand={product.brand}
                        key={index}
                        source="bestseller"
                    />
                );
            } else {
                return;
            }
        });
    }
    render() {
        return (
            <div className="bestsellers">
                <h3 className="bestsellers__heading">LAUNCHED BRAND</h3>
                <div className="product-card-list-outer" id="bestsellers">
                    {this.renderProduct()}
                </div>
            </div>
        );
    }
}
export default BestSellers;
