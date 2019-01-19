import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';

class Product extends Component {
    render() {
        const { id, title, img, price, inCart } = this.props.product;
        return (
            <ProductWrapper className="col-9 mx-auto cold-md-6 col-lg-3 my-3">
                <div className="card">
                    <div className="img-container p-5" onClick={console.log('you clicked me')}>
                        <Link to="/details">
                            <img src={img} alt="product" className="card-img-top" />
                        </Link>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

export default Product;

const ProductWrapper = styled.div`

`