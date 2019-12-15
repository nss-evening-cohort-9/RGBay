import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../../data/profileData';
import './SingleUser.css';
import firebase from 'firebase/app';
import 'firebase/auth';

class Single extends React.Component {
state = {
    user: {},
    isAuthUser: false
}

getProfileInfo = (userId) => {
  userData
  .getSingleUser(userId)
  .then((res) => {
      this.setState({ user: res.data })
      this.editButton();
      }
  )
  .catch(err => console.log("No information: ", err));
}


editButton = () => {
  if(this.state.user.firebaseUid === firebase.auth().currentUser.uid) {
    this.setState({ isAuthUser: true })
  } else {
    this.setState({ isAuthUser: false })
  }
}

deleteProfile = () => {
  const user = this.props.match.params.id;
  userData
  .removeUser(user)
  .then(() => this.getProfileInfo())
  .catch(err => console.error("Unable to delete single profile", err))
};

componentDidMount() {
  this.getProfileInfo(this.props.match.params.id)
}

render() {
  const { user } = this.state;
  let { isAuthUser } = this.state;
  const editLink = `/edituser/${user.id}`;
  const homeLink = `/`;

    return (
      <div className="container col-12 top-divide">
        <div className="container profile-top col-6">
          <h2 className="textables">{user.username}</h2>
          <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic"></img>
          <h5 className="textables">{user.email}</h5>
          <h5 className="textables">{user.city}</h5>
          <h5 className="textables">{user.state}</h5>
          <div className="textables">{user.bio}</div>
        </div>
          {/* // ternary */}
          {isAuthUser === true ? <Link 
          className="btn btn-success" to={editLink}>Edit</Link> : <></> 
          }
          {isAuthUser === true ? <Link 
          className="btn btn-danger" to={homeLink} id={user.id} onClick={this.deleteProfile}>Delete</Link> : <></> 
          }
      </div>
    )
  }
}

export default Single;