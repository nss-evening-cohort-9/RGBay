import React from 'react';
import userData from '../../data/profileData';
import './SingleUser.css';

class Single extends React.Component {
state = {
    user: {}
}

getProfileInfo = (userId) => {
  userData
  .getSingleUser(userId)
  .then((res) => {
      this.setState({ user: res.data })
      }
  )
  .catch(err => console.log("No information: ", err));
}

componentDidMount() {
  this.getProfileInfo(this.props.match.params.id)
}

render() {
    const { user } = this.state;
    return (
      <div className="container col-12 top-divide">
        <div className="container profile-top col-6">
          <h3 className="textables">{user.username}</h3>
          <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic"></img>
          <div className="textables">{user.email}</div>
          <div className="textables">{user.city}</div>
          <div className="textables">{user.email}</div>
          <div className="textables">{user.bio}</div>
        </div>
          {/* <button className="btn btn-primary" onClick={this.getProfileInfo(this.props.match.params.id)}>Test</button> */}
      </div>
    )
  }
}

export default Single;