import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import orderProductData from '../../data/orderProductData';

import './Cart.scss';

class CartProduct extends React.Component {

    render() {
        const { productProps } = this.props;
        const { remove } = this.props;
        const productLink = `/product/${productProps.id}`
        
        let price;
        if(productProps.rentalPrice !== 0 && productProps.salesPrice !== 0){
            price = <div>
                        <CardSubtitle>Cost Per Day: ${productProps.rentalPrice}</CardSubtitle>
                        <CardSubtitle>Cost To Purchase: ${productProps.salesPrice}</CardSubtitle>
                    </div>
        } else if(productProps.rentalPrice === 0){
            price = <CardSubtitle>Cost To Purchase: ${productProps.salesPrice}</CardSubtitle>
        } else if (productProps.salesPrice === 0){
            price = <CardSubtitle>Rental Price(Per Day): ${productProps.rentalPrice}</CardSubtitle>
        }


        return (
            <div className="Product">
                <Col>
                    <Card>
                        <Link to={productLink}><CardImg className="product-img" src={productProps.imageUrl} alt={productProps.title} /></Link>
                        <CardTitle><Link to={productLink}>{productProps.title}</Link></CardTitle>
                        {price}
                        <CardBody>
                            <CardText>
                                {productProps.description}
                            </CardText>
                            <br/>
                            <Button color="danger" onClick={() => {remove(productProps.opid)}}>Remove From Cart</Button>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default CartProduct;