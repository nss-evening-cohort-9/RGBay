import React from 'react'
import userData from '../../data/profileData';
// import AddUser from './AddUser';
import ShowUser from './ShowUser';

class UserProfile extends React.Component {
    state = {
        info: []
    }

    getProfileInfo = () => {
        userData
            .getAllUsers()
            .then((info) => {
                this.setState({ info })
            }
            )
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

    updateUser = (userId) => {
        return userId;
    };

    render() {
        const buildProfile = this.state.info.map((info) => (
            <ShowUser
                key={info.id}
                info={info}
                getProfileInfo={this.getProfileInfo}
                removeUser={this.removeUser}
                updateUser={this.updateUser}
            />
        ));

        return (
            <div className="Profile container">
                {/* <h4>Create Profile</h4>
                <AddUser
                    getProfileInfo={this.getProfileInfo}
                /> */}
                <div className="row">
                    {buildProfile}
                </div>
            </div>
        )
    }
}

export default UserProfile;