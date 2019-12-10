import React from 'react';
import userData from '../../data/profileData';

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
      <div className="container col">
      <div className="container col">
        <h4>Profile Page</h4>
      </div>
      <div className="container">
        {/* <div className="col-1"> */}
          <h3>{user.username}</h3>
          <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic"></img>
        {/* </div> */}
      </div>
      <div className="container">
        <div>{user.bio}</div>
      </div>
        <button className="btn btn-primary" onClick={this.getProfileInfo}>Test</button>
      </div>
    )
  }
}

export default Single;