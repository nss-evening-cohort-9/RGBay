import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './Cart.scss';

class CartProduct extends React.Component {

    render() {
        const { product, orderProductId, removeFromCart } = this.props;
        const productLink = `/product/${product.id}`
        let price;
        let buttons;
        if(product.rentalPrice !== 0 && product.salesPrice !== 0) {
            price = <div>
                        <CardSubtitle>Cost Per Day: ${product.rentalPrice}</CardSubtitle>
                        <CardSubtitle>Cost To Purchase: ${product.salesPrice}</CardSubtitle>
                    </div>;
            buttons =   <div>
                            <Button color="success">Rent</Button>
                            <Button color="success">Buy</Button>
                        </div>
        }
        else if(product.rentalPrice === 0) {
            price = <div><CardSubtitle>Cost To Purchase: ${product.salesPrice}</CardSubtitle></div>
            buttons = <div><Button color="success">Buy</Button></div>
        }
        else if (product.salesPrice === 0) {
            price = <div><CardSubtitle>Rental Price(Per Day): ${product.rentalPrice}</CardSubtitle></div>    
            buttons = <div><Button color="success">Rent</Button></div>
        }


        return (
            <div className="Product">
                <Col>
                    <Card>
                        <Link to={productLink}> <CardImg className="product-img" src={product.imageUrl} alt={product.title} /> </Link>
                        <CardTitle> <Link to={productLink}>{product.title}</Link> </CardTitle>
                        {price}
                        <CardBody>
                            <CardText> {product.description} </CardText>
                                <br/>
                            {buttons}
                            <Button color="danger" onClick={() => {removeFromCart(orderProductId)}}>Remove From Cart</Button>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default CartProduct;