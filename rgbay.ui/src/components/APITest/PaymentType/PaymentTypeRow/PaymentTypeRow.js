import React from 'react';
import {
  Button,
} from 'reactstrap';

import './PaymentTypeRow.scss';

class PaymentTypeRow extends React.Component {

  deletePaymentTypeEvent = (e) => {
    const { paymentType, deletePaymentType } = this.props;
    e.preventDefault();
    deletePaymentType(paymentType.id);
  }

  editPaymentType = (e) => {
    const { paymentType, editPaymentType } = this.props;
    e.preventDefault();
    editPaymentType(paymentType);
  }

  render() {
    const { paymentType } = this.props;
    return (
      <tr>
        <td>{paymentType.id}</td>
        <td>{paymentType.userId}</td>
        <td>{paymentType.serviceName}</td>
        <td>{paymentType.profileName}</td>
        <td>
          <Button outline onClick={this.deletePaymentTypeEvent}><i className="fas fa-times"></i></Button>
          <Button outline onClick={this.editPaymentType}><i className="fas fa-pencil-alt"></i></Button>
        </td>
      </tr>
    )
  }
}

export default PaymentTypeRow;