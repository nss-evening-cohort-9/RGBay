import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './Cart.scss';

class CartProduct extends React.Component {
    render() {
        const { productProp } = this.props;
        const productLink = `/product/${productProp.id}`
        
        let price;
        if(productProp.rentalPrice != 0 && productProp.salesPrice != 0){
            price = <div>
                    <CardSubtitle>Cost Per Day: ${productProp.rentalPrice}</CardSubtitle>
                    <CardSubtitle>Cost To Purchase: ${productProp.salesPrice}</CardSubtitle>
                    </div>
        } else if(productProp.rentalPrice == 0){
            price = <CardSubtitle>Cost To Purchase: ${productProp.salesPrice}</CardSubtitle>
        } else if (productProp.salesPrice == 0){
            price = <CardSubtitle>Rental Price(Per Day): ${productProp.rentalPrice}</CardSubtitle>
        }


        return (
            <div className="Product">
                <Col>
                    <Card>
                        <Link to={productLink}><CardImg className="product-img" src={productProp.imageUrl} alt={productProp.title} /></Link>
                        <CardTitle><Link to={productLink}>{productProp.title}</Link></CardTitle>
                        {price}
                        <CardBody>
                            {productProp.description}
                            <br/>
                            <Button color="danger">Remove From Cart</Button>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default CartProduct;