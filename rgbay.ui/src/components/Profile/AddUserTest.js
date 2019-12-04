import React from 'react';
import userData from '../../data/profileData';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import orderData from '../../data/orderData';

const defaultUserInfo = {
    username: '',
    email: '',
    city: '',
    state: '',
    bio: ''
}

class AddUser extends React.Component {
    state = {
        user: [],
        newUser: defaultUserInfo
    }

    stringStateField = (name, e) => {
        const makeNewUser = { ...this.state.newUser };
        makeNewUser[name] = e.target.value;
        this.setState({ newUser: makeNewUser });
    }

    usernameChange = e => this.stringStateField('username', e);
    emailChange = e => this.stringStateField('email', e);
    cityChange = e => this.stringStateField('city', e);
    stateChange = e => this.stringStateField('state', e);
    bioChange = e => this.stringStateField('bio', e);

    getProfileInfo = () => {
        userData
        .getUserInfo()
        .then(user => this.setState({ user }))
        .catch(err => console.log("No information: ", err));
    };

    addUser = (e) => {
        e.preventDefault();
        const saveNewUser = { ...this.state.newUser };
        console.log(saveNewUser)
        userData.postNewUser(saveNewUser)
        .then(() => this.getProfileInfo())
        this.setState({
            newUser: saveNewUser
        })
    };

    // componentDidMount() {
    //     this.getProfileInfo();
    // }

    render() {
        return (
            <div className="newUserForm">
                <div className="container">
                    <Form className="col-8 offset-2" onSubmit={this.addUser}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        className="username"
                        id="userName"
                        placeholder="Enter A Username"
                        value={this.state.newUser.username}
                        onChange={this.usernameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                        type="email"
                        className="email"
                        id="userEmail"
                        placeholder="Enter Email Address"
                        value={this.state.newUser.email}
                        onChange={this.emailChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                        type="text"
                        className="city"
                        id="userCity"
                        placeholder="Enter Your City"
                        value={this.state.newUser.city}
                        onChange={this.cityChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                        type="text"
                        className="state"
                        id="userState"
                        placeholder="Enter Your State (ex: AZ)"
                        value={this.state.newUser.state}
                        onChange={this.stateChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Bio</Label>
                        <Input 
                        type="textarea" 
                        className="bio" 
                        id="userBio"
                        placeholder="Explain yourself! (optional)"
                        value={this.state.newUser.bio}
                        onChange={this.bioChange} />
                    </FormGroup>
                    <Button type="submit" className="btn btn-success">Add User</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddUser;