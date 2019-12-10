import React from 'react';
import { Link } from 'react-router-dom';
import {
  CardBody,
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
    const singleUser = `profileview/${info.id}`;
    return (
    <div className="container">
      <div className="row">
        <Card className="col-4 offset-4">
          <CardBody>
          <Link className="btn" id={info.id} to={singleUser} onClick={this.singleUserProfile}>{info.username}</Link>
          <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic"></img>
          <h6>Profile Info:</h6>
          <h6>Email:</h6>
          <CardText className="card-text">{info.email}</CardText>
          <h6>City:</h6>
          <CardText className="card-text">{info.city}</CardText>
          <h6>State:</h6>
          <CardText className="card-text">{info.state}</CardText>
          <h6>Bio:</h6>
          <CardText className="card-text">{info.bio}</CardText>
          <Link className="btn btn-success" to={editLink}>Edit</Link>
          <button type="submit" className="btn btn-danger" onClick={this.removeUser}>Delete User</button>
          </CardBody>
        </Card>
      </div>
    </div>
    )
  }
}

export default ShowUser;