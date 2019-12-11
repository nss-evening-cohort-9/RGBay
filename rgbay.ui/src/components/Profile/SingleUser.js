import React from 'react';
import userData from '../../data/profileData';
import './SingleUser.css';

class Single extends React.Component {
state = {
    user: {}
}

getProfileInfo = (userId) => {
  userData
  .getUserInfo(userId)
  .then((user) => {
      this.setState({ user: user })
      console.log(user)
      }
  )
  .catch(err => console.log("No information: ", err));
}

render() {
    const { user } = this.state;
    return (
      <div className="container col-12 top-divide">
        <div className="container profile-top col-6">
          {/* {/* <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic"></img> */}
        </div>

        <div className="container profile-top col-6">
          <div className="textables">Username: {user.id}</div>
          <div className="textables">Email: {user.email}</div>
          <div className="textables">City: {user.city}</div>
          <div className="textables">Email: {user.email}</div>
          <div className="textables">Bio:{user.bio}</div> */}
        </div>
          {/* <button className="btn btn-primary" onClick={this.getProfileInfo}>Test</button> */}
      </div>
    )
  }
}

export default Single;