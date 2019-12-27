import React from 'react'

import { 
    Table,
    Button,
    Container,
    Row
} from 'reactstrap';
import CartProduct from './CartProduct';
import CartOrder from './CartOrder';

import orderProductData from '../../data/orderProductData';

class Cart extends React.Component {
    state = {
        orderState: {},
        products: []
    }

    getOrderProducts = () => {
        orderProductData.getCartOrderProducts()
        .then((resp) => {
            const order = resp.cartOrder;
            const productArray = [];
            resp.cartProducts.forEach(product => {
                productArray.push(product);
            });
            this.setState({orderState: order, products: productArray});
        })
        .catch(err => console.error("error in Cart.js", err))
    }

    componentDidMount() {
        this.getOrderProducts();
    }

    render() {
        const productsInCart = this.state.products.map(productProp => (
            <CartProduct
                key={productProp.id}
                productProp={productProp}
                getOrderProducts={this.getOrderProducts}
            />
        ));
        return (
            <div className="Cart">
                <Container fluid="md">
                    <h4>Items In Cart</h4>
                        <Row xs="4">
                            {productsInCart}
                        </Row>
                    <h4>Order Details</h4>
                    <CartOrder key={`cartOrder${this.state.orderState.Id}`} orderProp={this.state.orderState}/>
                </Container>
            </div>
        );
    }
}

export default  Cart;