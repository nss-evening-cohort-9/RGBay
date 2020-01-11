import React from 'react';
import {Link} from 'react-router-dom';

class OrderItem extends React.Component {
    render() {
        const { product, duration } = this.props;
        const productLink = `/product/${product.id}`
        let rentOrBuy;
        let total;
        let daysRented;
        const rentalPrice = product.rentalPrice;
        const salesPrice = product.salesPrice;
        const pricePerDay = (rentalPrice / 100).toFixed(2);
        const totalCost = (pricePerDay * duration).toFixed(2);
        const costToBuy = (salesPrice / 100).toFixed(2);
        if (duration !== 0){
            rentOrBuy = <td>Rented</td>
            total = <td>{totalCost}</td>
            daysRented = <td>{duration}</td>
        }
        else if (duration === 0){
            rentOrBuy = <td>Purchased</td>
            total = <td>{costToBuy}</td>
            daysRented = <td>N/A</td>
        }
        return(
                <tr className="OrderItem">
                <td><Link to={productLink}>{product.title}</Link></td>
                {rentOrBuy}
                {daysRented}
                {total}
                </tr>
        )
    }
}

export default OrderItem;
