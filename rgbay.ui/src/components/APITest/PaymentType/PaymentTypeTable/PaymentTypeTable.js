import React from 'react';
import {
  Button,
  Table
} from 'reactstrap';

import './PaymentTypeTable.scss';
import paymentTypeData from '../../../../data/paymentTypeData';
import PaymentTypeRow from '../PaymentTypeRow/PaymentTypeRow';

class PaymentTypeTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {paymentTypes: []};
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    paymentTypeData.getAllPaymentTypes()
      .then((paymentTypes) => {
        let freshPaymentTypes = [...paymentTypes];
        console.log(freshPaymentTypes);
        this.setState({ paymentTypes: freshPaymentTypes })
      })
      .catch(error => console.error(`could not get paymentTypes`, error));
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    const paymentTypeRows = this.state.paymentTypes.map(paymentType => (
      <PaymentTypeRow
        key={`paymentType${paymentType.id}`}
        paymentType={paymentType}
        update={this.updateData}
      />
    ));
    return (
      <div>
        <h2>PaymentType Data</h2>
        <Button onClick={() => this.updateData()}>Update Data</Button>
        <Table striped responsive>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">userId</th>
              <th scope="col">serviceName</th>
              <th scope="col">profileName</th>
            </tr>
          </thead>
          <tbody>
              {paymentTypeRows}
            </tbody>
        </Table>
      </div>
    )
  }
}

export default PaymentTypeTable;