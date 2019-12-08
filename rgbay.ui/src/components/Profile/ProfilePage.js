import React from 'react';
import userData from '../../data/profileData';
// import { Link } from 'react-router-dom';
// import {
//   CardBody, 
//   CardTitle, 
//   CardText, 
//   Card
// } from 'reactstrap';

class ShowUser extends React.Component {
state = {
  info: []
}

removeUser = (e) => {
  e.preventDefault();
  const { info, removeUser } = this.props;
  removeUser(info.id)
  // console.error("Delete button")
}

getProfileInfo = () => {
  userData
  .getUserInfo()
  .then((info) => {
      this.setState({ info })
      console.log(info)
      }
  )
  .catch(err => console.log("No information: ", err));
} 

render() {
    // const { info } = this.props;
    // const editLink = `edituser/${info.id}`;
    return (
    <div>
      {/* <h3>{info.username}</h3> */}
      <img src="#" alt="avi">

      </img>
      <h3>Hello Universe</h3>
    </div>
    )
  }
}

export default ShowUser;