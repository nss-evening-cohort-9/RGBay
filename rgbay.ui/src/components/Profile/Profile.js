import React from 'react'
import userData from '../../data/profileData';
import AddUser from '../Profile/AddUserTest';
import ShowUserTest from './ShowUserTest';
// import { ListGroup, ListGroupItem } from 'reactstrap';

class UserProfile extends React.Component {
    state = {
        info: []
    }
    
    getProfileInfo = () => {
        userData
        .getUserInfo()
        .then((info) => this.setState({ info }))
        .catch(err => console.log("No information: ", err));
    }

    

    componentDidMount() {
        this.getProfileInfo();
    }

    removeUser = (userId) => {
        userData
        .removeUser(userId)
        .then(() => this.getProfileInfo())
        .catch(err => console.error("Unable to remove the user", err));
    };
    
    render() {
        const buildProfile = this.state.info.map((info) => (
            <ShowUserTest 
            key={info.id} 
            info={info}
            getProfileInfo={this.getProfileInfo}
            removeUser={this.removeUser}
            />
        ));

        return(
            <div className="Profile">
                <h4>Create Profile</h4>
                <AddUser
                getProfileInfo={this.getProfileInfo}
                />
                {buildProfile}
            </div>
        )
    }
}

export default UserProfile