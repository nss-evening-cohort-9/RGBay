import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Table
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

import './PaymentTypeTable.scss';
import paymentTypeData from '../../../../data/paymentTypeData';
import PaymentTypeRow from '../PaymentTypeRow/PaymentTypeRow';
import profileData from '../../../../data/profileData';

const defaultPaymentType = {
  id: '',
  userId: '',
  serviceName: '',
  profileName: ''
};

class PaymentTypeTable extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { paymentTypes: [] };
  //   this.updateData = this.updateData.bind(this);
  // }

  state = {
    paymentTypes: [],
    isEditing: false,
    formPaymentType: defaultPaymentType,
    currentUser: {}
  }

  componentDidMount() {
    this.updateData();
    this.getUserId();
  }

  getUserId = () => {
    let firebaseUserId = firebase.auth().currentUser.uid;
    profileData.getUserByUid(firebaseUserId)
      .then((user) => {
        this.setState({currentUser: user.data});
      })
      .catch(error => console.error('could not get current user', error));
  }

  paymentTypeFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.isEditing) {
      this.updatePaymentType(this.state.formPaymentType)
    } else {
      this.addPaymentType(this.state.formPaymentType);
    }
  }

  updatePaymentType = (updatedPaymentType) => {
    let paymentType = { ...updatedPaymentType };
    paymentType.userId = firebase.auth().currentUser.uid;
    paymentTypeData.updatePaymentType(paymentType.id, paymentType)
      .then(() => {
        this.setState({ isEditing: false, formPaymentType: defaultPaymentType });
        this.updateData();
      })
      .catch(error => console.error('unable to update PaymentType', error));
  }

  addPaymentType = (newPaymentType) => {
    let paymentType = { ...newPaymentType };
    paymentType.userId = firebase.auth().currentUser.uid;
    paymentTypeData.postPaymentType(paymentType)
      .then(() => {
        this.setState({ isEditing: false, formPaymentType: defaultPaymentType });
        this.updateData();
      })
      .catch(error => console.error('unable to add PaymentType', error));
  }

  editPaymentType = (paymentTypeToEdit) => {
    const paymentType = { ...paymentTypeToEdit };
    this.setState({ isEditing: true, formPaymentType: paymentType });
  }

  deletePaymentType = (id) => {
    paymentTypeData.deletePaymentType(id)
      .then(() => this.updateData())
      .catch(error => console.error('unable to delete PaymentType', error));
  }

  updateData() {
    paymentTypeData.getAllPaymentTypes()
      .then((paymentTypes) => {
        let freshPaymentTypes = [...paymentTypes];
        this.setState({ paymentTypes: freshPaymentTypes })
      })
      .catch(error => console.error(`could not get paymentTypes`, error));
  }

  paymentTypeFormChange = (e) => {
    const newFormPaymentType = { ...this.state.formPaymentType };
    if (e.target.id === "profileName") {
      newFormPaymentType.profileName = e.target.value;
    } else if (e.target.id === "serviceName") {
      newFormPaymentType.serviceName = e.target.value;
    }
    this.setState({ formPaymentType: newFormPaymentType });
  }

  render() {
    const paymentTypeRows = this.state.paymentTypes.map(paymentType => (
      <PaymentTypeRow
        key={`paymentType${paymentType.id}`}
        paymentType={paymentType}
        update={this.updateData}
        deletePaymentType={this.deletePaymentType}
        editPaymentType={this.editPaymentType}
        currentUserId={this.state.currentUser.id}
      />
    ));
    return (
      <div className="PaymentTypeTable card-body">
        <h2>PaymentType Data</h2>
        <Form onSubmit={this.paymentTypeFormSubmit}>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="profileName">Profile Name</Label>
                <Input
                  id="profileName"
                  placeholder="ex: userName01"
                  value={this.state.formPaymentType.profileName}
                  onChange={this.paymentTypeFormChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="serviceName">Service</Label>
                <Input
                  id="serviceName"
                  placeholder="ex: PayPal"
                  value={this.state.formPaymentType.serviceName}
                  onChange={this.paymentTypeFormChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="paymentTypeSubmit">{this.state.formPaymentType.id === "" ? 'Add Payment Type' : 'Edit Payment Type'}</Label>
                <Button id="paymentTypeSubmit" type="submit" color="primary" className="ml-auto mr-auto d-block">
                  {this.state.formPaymentType.id === "" ? 'Create' : 'Update'}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">userId</th>
              <th scope="col">serviceName</th>
              <th scope="col">profileName</th>
              <th scope="col">actions</th>
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