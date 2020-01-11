import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './Cart.scss';

class CartProduct extends React.Component {

    render() {
        const { product, orderProductId, removeFromCart, duration } = this.props;
        const productLink = `/product/${product.id}`
        const rentalPrice = product.rentalPrice;
        const salesPrice = product.salesPrice;
        const pricePerDay = (rentalPrice / 100).toFixed(2);
        const totalCost = pricePerDay * duration;
        const costToBuy = (salesPrice / 100).toFixed(2);

        let cardBody;
        const rentalBody =  <div>
                                <CardSubtitle>Price Per Day:</CardSubtitle>
                                <CardText>${pricePerDay}</CardText>
                                <CardSubtitle>Number Of Days:</CardSubtitle>
                                <CardText>{duration}</CardText>
                                <CardSubtitle>Total Cost:</CardSubtitle>
                                <CardText>${totalCost}</CardText>
                            </div>;

        const purchaseBody =    <div>
                                    <CardSubtitle>Total Cost</CardSubtitle>
                                    <CardText>{costToBuy}</CardText>
                                </div>;

        if(duration === 0){
            cardBody = <CardBody>{purchaseBody}</CardBody>
        } else if (duration !== 0) {
            cardBody = <CardBody> {rentalBody} </CardBody>
        }

        return (
            <div className="Product">
                <Col>
                    <Card body className="cart-item-card">
                        <Link to={productLink}> <CardImg className="product-img" src={product.imageUrl} alt={product.title} /> </Link>
                        <CardTitle> <Link to={productLink}>{product.title}</Link> </CardTitle>
                        {cardBody}
                        <Button color="danger" onClick={() => {removeFromCart(orderProductId)}}>Remove From Cart</Button>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default CartProduct;