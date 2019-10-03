import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import './EditProfile.css';

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            isSubmitted: false
        }
    }

    handleChange(event) {
        this.setState({bio: event.target.value})
    }
    render(){
    return (
        <div className="EditProfile">
            <div className="EditingBox">
                <h3> Edit Profile </h3>
                <form action="http://localhost:5000/editprofile" method="POST">
                    Bio: <br/>
                    <input type="text" name="bio" value={this.state.bio}
                    onChange={this.handleChange.bind(this)}/><br></br>

                    Change Profile Picture: <br/>
                    <input type="submit" value="upload"/><br></br>
                    <input type="submit" value="Save Changes"/>
                </form>
            </div>


        </div>
    )
    }
}

export default EditProfile
