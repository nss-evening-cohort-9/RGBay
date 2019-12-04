import React from 'react';
// import userData from '../../data/userData';
import {
  CardBody, 
  CardTitle, 
  CardText, 
  Card
} from 'reactstrap';

class UserCard extends React.Component {

removeUser = (e) => {
  e.preventDefault();
  const { info, removeUser } = this.props;
  removeUser(info.id)
  // console.error("Delete button")
  
}

render() {
    const { info } = this.props;
    return (
    <div className="col-4 offset-4">
      <Card>
        <CardBody>
        <CardTitle>{info.username}</CardTitle>
        <CardText>{info.email}</CardText>
        <CardText>{info.city}</CardText>
        <CardText>{info.state}</CardText>
        <CardText>{info.bio}</CardText>
        <button type="submit" className="btn btn-danger" onClick={this.removeUser}>Delete User</button>
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default UserCard;