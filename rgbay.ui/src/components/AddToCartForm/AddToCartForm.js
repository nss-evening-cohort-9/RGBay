import React from 'react';
import orderProductData from '../../data/orderProductData';
import orderData from '../../data/orderData';

import './AddToCartForm.scss';

class AddToCartForm extends React.Component {
    state = {
        priceTotal: 0,
        rentalDuration: 0
    }

    createOrderProduct = () => {
        const { productId } = this.props;
        const { rentalDuration } = this.state;
        orderData.getCartOrder()
            .then((order) => {
                const orderProduct = {
                    OrderId: order.id,
                    ProductId: productId,
                    Duration: rentalDuration
                };
                orderProductData.addOrderProduct(orderProduct);
            })
            .catch(err => console.error(err, "error in creatOrderProduct()"));
    }

    rentSubmit = (e) => {
        e.preventDefault();
        this.createOrderProduct();
    }

    buySubmit = (e) => {
        e.preventDefault();
        this.createOrderProduct();
    }

    updateDays = e => this.setState({ rentalDuration: e.target.value });

    render() {
        const { rentalDuration, rentalPrice, salesPrice } = this.props;
        let forms;
        const pricePerDay = (rentalPrice / 100).toFixed(2);
        const priceToBuy = (salesPrice / 100).toFixed(2);
        const totalAmount = ((this.state.rentalDuration * rentalPrice) / 100).toFixed(2);
        const rentalForm =  <form className="rent-form" onSubmit={this.rentSubmit}>
                                <div className="rent-con">
                                    <label>
                                        <input 
                                            type="number"
                                            min="0"
                                            name="days"
                                            className="rent-input"
                                            value={rentalDuration}
                                            onChange={this.updateDays}
                                            placeholder="Days"
                                        /> 
                                    </label>
                                    <p className="rental-price-p">
                                        (${pricePerDay} per day)
                                        <br/>
                                        (Total: ${totalAmount})
                                    </p>
                                    <input type="submit" value="Rent" className="rent-submit"/>
                                </div>
                            </form>;
                            
        const buyForm =     <form className="buy-form" onSubmit={this.buySubmit}>
                                <div className="buy-con">
                                    <label>{priceToBuy}$</label>
                                    <input
                                        type="submit"
                                        name="buyInput"
                                        value="Buy"
                                        className="buy-submit"
                                    />
                                </div>
                            </form>

        if(rentalPrice !== 0 && salesPrice !== 0){
            forms = <div>{rentalForm} {buyForm}</div>
        }
        else if(rentalPrice !== 0 && salesPrice === 0){
            forms = <div>{rentalForm}</div>
        }
        else if(rentalPrice === 0 && salesPrice !== 0){
            forms = <div>{buyForm}</div>
        }

        return(
            <div className="AddToCartForm">
                {forms}
            </div>
        )
    }
}

export default AddToCartForm;