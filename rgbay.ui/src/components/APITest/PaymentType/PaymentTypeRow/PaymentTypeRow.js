import React from 'react';

import './PaymentTypeRow.scss';

class PaymentTypeRow extends React.Component {

  render () {
    const { paymentType } = this.props;
    return (
      <tr>
        <td>{paymentType.id}</td>
        <td>{paymentType.userId}</td>
        <td>{paymentType.serviceName}</td>
        <td>{paymentType.profileName}</td>
      </tr>
    )
  }
}

export default PaymentTypeRow;