import React from 'react'

import { 
    Container,
    Row
} from 'reactstrap';
import CartProduct from './CartProduct';
import CartOrder from './CartOrder';

import orderProductData from '../../data/orderProductData';

class Cart extends React.Component {
    state = {
        orderState: {},
        productsState: []
    }

    getCart = () => {
        orderProductData.getCart()
        .then((resp) => {

            const order = resp.cartOrder;
            const cartItems = resp.cartItems;
            const cart = Object.entries(cartItems);
            const productArray = [];
            cart.forEach(entry => {
                const id = entry[0];
                entry[1].opid = id;
                productArray.push(entry[1])
            })
            this.setState({orderState: order, productsState: productArray});
        })
        .catch(err => console.error("error in Cart.js", err))
    }

    remove = (opid) => {
        console.log(opid);
        orderProductData.deleteProductFromCart(opid)
            .then(() => this.getCart())
            .catch(err => console.error(err));
}

    componentDidMount() {
        this.getCart();
    }

    render() {
        const productsInCart = this.state.productsState.map(productProps => (
            <CartProduct
                key={`product${productProps.opid}`}
                productProps={productProps}
                getCart={this.getCart}
                remove={this.remove}
            />
        ));
        return (
            <div className="Cart">
                <Container>
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