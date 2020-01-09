import React from 'react'

import { 
    Container,
    Row
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth'

import CartProduct from './CartProduct';
import CartOrder from './CartOrder';

import orderProductData from '../../data/orderProductData';

class Cart extends React.Component {
    state = {
        cartOrder: {},
        cartOrderId: Number,
        cartItems: []
    }

    getCart = () => {
        orderProductData.getCart()
            .then(cart => this.setState({ cartOrder: cart.cartOrder, cartOrderId:cart.orderId, cartItems: cart.cartItems }))
            .catch(err => console.error(err, "error in getUserCart()"));
    }

    removeFromCart = (orderProductId) => {
        orderProductData.deleteProductFromCart(orderProductId)
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
                orderProductId={Object.values(cartItem)[0]}
                getCart={this.getCart}
                removeFromCart={this.removeFromCart}
            />
        ));
        return (
            <div className="Cart">
                <Container>
                    <h4>Order Details</h4>
                    <CartOrder key={`cartOrder${this.state.cartOrder.Id}`} orderProp={this.state.cartOrder}/>
                    <h4>Items In Cart</h4>
                    <Row xs="4"> {productsInCart} </Row>
                </Container>
            </div>
        );
    }
}

export default  Cart;