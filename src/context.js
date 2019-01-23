import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider 
//Consumer


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: [],
        modalOpen: true,
        modalProduct: detailProduct
    };

    componentDidMount() {
        this.setProducts();
    }

    // looping through an array of objects and copy values - not referencing them as we don't want to alter the values in the data js file.
    setProducts = () => {
        // set tempProducts to empty array
        let tempProducts = [];
        storeProducts.forEach(item => {
            // destructure object item and store it into a variable 
            const singleItem = { ...item };
            // reassign tempProducts to be an array of objects - a copy of the products from data js
            tempProducts = [...tempProducts, singleItem];
        })
        // set state to be new tempProducts 
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        });
    };

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] }
        },
            () => {
                console.log(this.state)
            }
        );
    };

    openModal = id => {
        const modalProduct = this.getItem(id);
        this.setState(() => {
            return { modalProduct, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };