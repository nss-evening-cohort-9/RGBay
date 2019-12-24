import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../../data/profileData';
import UserProduct from './UserProduct';
import Reviews from './Reviews';
import './SingleUser.css';
import firebase from 'firebase/app';
import 'firebase/auth';

class SingleUser extends React.Component {
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

  getSingleUserProducts = (userId) => {

  }


  editButton = () => {
    if (this.state.user.firebaseUid === firebase.auth().currentUser.uid) {
      this.setState({ isAuthUser: true })
    } else {
      this.setState({ isAuthUser: false })
    }
  }



  deleteProfile = () => {
    const user = this.props.match.params.id;
    userData
      .removeUser(user)
      .then(() => {
        this.getProfileInfo()
      })
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
      <div>
        <div className="container">
          <div className="row">
            <div className="user col-6">
              <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="user-avi"></img>
              <h2 className="text">{user.username}</h2>
            </div>
            <div className="about-user col-6">
              <p className="text">{user.email}</p>
              <p className="text">{user.city}</p>
              <p className="text">{user.state}</p>
              <h6>Bio:</h6>
              <p className="text">{user.bio}</p>
              
              <div className="auth-buttons">
                {isAuthUser === true ? <Link
                  className="btn btn-success" to={editLink}>Edit</Link> : <></>
                }
                {isAuthUser === true ? <Link
                  className="btn btn-danger" to={homeLink} id={user.id} onClick={this.deleteProfile}>Delete</Link> : <></>
                }
              </div>

            </div>
          </div>  
        </div>
          <div className="container">
            <div className="row">
              <div className="products-display col-12">
                <UserProduct />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="reviews col-12">
                <Reviews
                key={user.id}
                user={user}
                 />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default SingleUser;