import React from 'react';
import userData from '../../data/profileData';
import { 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Button 
} from 'reactstrap';
import { Link } from 'react-router-dom';


const defaultUserInfo = {
    username: '',
    email: '',
    city: '',
    state: '',
    bio: ''
}

class EditUser extends React.Component {
    state = {
        user: [],
        editedUser: defaultUserInfo
    }

    stringStateField = (name, e) => {
        const copyUser = { ...this.state.editedUser };
        copyUser[name] = e.target.value;
        this.setState({ editedUser: copyUser });
    }

    usernameChange = e => this.stringStateField('username', e);
    emailChange = e => this.stringStateField('email', e);
    cityChange = e => this.stringStateField('city', e);
    stateChange = e => this.stringStateField('state', e);
    bioChange = e => this.stringStateField('bio', e);

    // gets data back for the form in edit
    componentDidMount() {
    const userId = this.props.match.params.id;
    userData
      .getSingleUser(userId)
      .then(userStuff => this.setState({ editedUser: userStuff.data }))
      .catch(err => console.error("could not edit profile", err));
    }

    updateProfileInfo = (e) => {
        e.preventDefault();
        const updateTheUser = { ...this.state.editedUser };
        const userId = this.props.match.params.id;
        userData
            .updateUser(updateTheUser, userId)
            .then(() => this.props.history.push(`/profileview/${userId}`))
            .catch(err => console.log("No information: ", err));
    }

    render() {
        const {editedUser} = this.state;
        return (
            <div className="editUserForm">
                <h1>Edit you profile</h1>
                <div className="container">
                    <Form className="col-8 offset-2" onSubmit={this.updateProfileInfo}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        className="username"
                        id="userName"
                        placeholder="Enter A Username"
                        value={editedUser.username}
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
                        value={editedUser.email}
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
                        value={editedUser.city}
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
                        value={editedUser.state}
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
                        value={editedUser.bio}
                        onChange={this.bioChange} />
                    </FormGroup>
                    <Button type="submit" className="btn btn-success update-button">Update</Button>
                    <Link className="btn btn-primary cancel-button" to={`/profileview/${editedUser.id}`}>Cancel</Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default EditUser;