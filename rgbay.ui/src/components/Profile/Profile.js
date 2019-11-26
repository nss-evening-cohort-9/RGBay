import React from 'react'
import ProfileReq from '../../data/profileData';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
    
    showInfo = () => {
        const profileInfo = [...this.state.info];
        return profileInfo.map(info => (<div className="user" key={info.id}>
        <ListGroup>
            <ListGroupItem><h5>{info.username}</h5></ListGroupItem>
            <ListGroupItem><p>{info.email}</p></ListGroupItem>
            <ListGroupItem><p>{info.city}</p></ListGroupItem>
            <ListGroupItem><p>{info.state}</p></ListGroupItem>
            <ListGroupItem><p>{info.bio}</p></ListGroupItem>
        </ListGroup>
        </div>));
    }

    componentDidMount() {
        this.getProfileInfo();
    }
    
    render() {
        return(
            <div className="Profile">
                <h4>User Profile</h4>
                <div>{this.showInfo()}</div>
            </div>
        )
    }
}

export default UserProfile