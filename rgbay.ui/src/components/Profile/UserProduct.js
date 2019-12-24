import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

class UserProduct extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Product title</CardTitle>
            <CardSubtitle>Product subtitle</CardSubtitle>
          </CardBody>
          <img width="100%" src="/assets/318x180.svg" alt="Card display" />
          <CardBody>
            <CardText>Product Text.</CardText>
          </CardBody>
        </Card>­­­­
      </div>
    )
  }
}

export default UserProduct;