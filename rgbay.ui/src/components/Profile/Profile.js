import React from 'react'
import ProfileReq from '../../data/profileData';
import AddUser from '../Profile/AddUserTest';
import UserCard from './ShowUserTest';
// import { ListGroup, ListGroupItem } from 'reactstrap';

class UserProfile extends React.Component {
    state = {
        info: []
    }
    
    getProfileInfo = () => {
        ProfileReq.getUserInfo()
        .then((info) => {
            let myInfo = [...info];
            this.setState({info: myInfo})
        })
        .catch(err => console.log("No information: ", err));
    }

    removeUser = (userId) => {
        ProfileReq
        .removeUser(userId)
        console.log(userId)
        .then((res) => this.getProfileInfo(res))
        .catch(err => console.log("Unable to delete user", err));
    }
    
    buildProfile = () => {
    return this.state.info.map((info) => (
        <UserCard key={info.id} info={info} />
        ));
    }

    componentDidMount() {
        this.getProfileInfo();
    }
    
    render() {
        return(
            <div className="Profile">
                <h4>User Profile</h4>
                <AddUser />
                {this.buildProfile()}
            </div>
        )
    }
}

export default UserProfile