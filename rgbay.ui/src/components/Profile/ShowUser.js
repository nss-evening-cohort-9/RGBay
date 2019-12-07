import React from 'react';
import { Link } from 'react-router-dom';
import {
  CardBody, 
  CardTitle, 
  CardText, 
  Card
} from 'reactstrap';

class ShowUser extends React.Component {

removeUser = (e) => {
  e.preventDefault();
  const { info, removeUser } = this.props;
  removeUser(info.id)
  // console.error("Delete button")
  
}

render() {
    const { info } = this.props;
    const editLink = `edituser/${info.id}`;
    return (
    <div className="col-4 offset-4">
      <Card>
        <CardBody>
        <CardTitle>{info.username}</CardTitle>
        <CardText>{info.email}</CardText>
        <CardText>{info.city}</CardText>
        <CardText>{info.state}</CardText>
        <CardText>{info.bio}</CardText>
        <Link className="btn btn-success" to={editLink}>Edit</Link>
        <button type="submit" className="btn btn-danger" onClick={this.removeUser}>Delete User</button>
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default ShowUser;