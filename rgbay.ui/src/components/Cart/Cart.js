import React from 'react'
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth'
import CartProduct from './CartProduct';
import CartOrder from './CartOrder';
import orderProductData from '../../data/orderProductData';
import orderData from '../../data/orderData';

import './Cart.scss';

class Cart extends React.Component {
    state = {
        cartOrder: {},
        cartOrderId: Number,
        cartItems: [],
        orderTotal: Number
    }

    getCart = () => {
        orderProductData.getCart()
            .then((cart) => {
                this.setState({ 
                    cartOrder: cart.cartOrder,
                    cartOrderId:cart.orderId,
                    cartItems: cart.cartItems,
                    orderTotal: cart.cartOrder.total
                    })
            })
            .catch(err => console.error(err, "error in getUserCart()"));
    }

    removeFromCart = (orderProductId) => {
        orderProductData.deleteProductFromCart(orderProductId)
            .then(() => this.getCart())
            .catch(err => console.error(err));
    }

    orderCheckout = (order) => {
        orderData.checkoutCart(order)
            .then(() => this.getCart())
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getCart();
    }

    render() {
        const { uid } = firebase.auth().currentUser;
        const productsInCart = this.state.cartItems.map(cartItem => (
            <CartProduct
                key={`_user_${uid}_order_${this.state.cartOrderId}_opid_${Object.values(cartItem)[0]}`}
                product={cartItem.product}
                duration={cartItem.duration}
                orderProductId={Object.values(cartItem)[0]}
                getCart={this.getCart}
                removeFromCart={this.removeFromCart}
            />
        ));

        const orderDetails = <CartOrder
                                key={`cartOrder${this.state.cartOrder.Id}`}
                                order={this.state.cartOrder}
                                orderCheckout={this.orderCheckout}
                                getCart={this.getCart}
                                />
        return (
            <div className="Cart">
                <Container className="cart-con">
                    <div>
                        <h4>Order Details</h4>
                        <div className="order-details">{orderDetails}</div>
                    </div>
                    <div>
                        <h4>Items In Cart</h4>
                        <div className="items-in-cart"> {productsInCart} </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default  Cart;