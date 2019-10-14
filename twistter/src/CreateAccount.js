import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import Login from './Login'
import EditProfile from './EditProfile'
import './CreateAccount.css';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirm: '',
            handle: '',
            isSubmitted: false
        }
    }

    handleFirstNameChange(event) {
        this.setState({firstname: event.target.value})
    }
    handleLastNameChange(event) {
        this.setState({lastname: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handlePasswordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value})
    }

    handleHandleChange(event) {
        this.setState({handle: event.target.value})
    }

    render(){
    return (
        <div className="CreateAccount">
            <div className="inputBox">
                <h3> Create Account </h3>
                <form action="http://localhost:5000/register" method="POST">
                    {/*add validation so it tells you as you type*/}
                    First Name: <br/>
                    <input type="text" name="firstname"  value={this.state.firstname}
                    onChange={this.handleFirstNameChange.bind(this)} focus /><br></br>
                    Last Name: <br/>
                    <input type="text" name="lastname" value={this.state.lastname}
                    onChange={this.handleLastNameChange.bind(this)} /><br></br>
                    Email:<br/>
                    <input type="text" name="email" value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)} /><br></br>
                    Password: <br/>
                    <input type="password" name="password" value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)} /><br></br>
                    Confirm Password: <br/>
                    <input type="password" name="passwordConfirm" value={this.state.passwordConfirm}
                    onChange={this.handlePasswordConfirmChange.bind(this)} /><br></br>
                    @ <br/>
                    <input type="text" name="handle" value={this.state.handle}
                    onChange={this.handleHandleChange.bind(this)} />
                    <input type="submit" value="Submit"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">Existing User?</NavLink><br></br>
                <NavLink to="/editprofile">Edit profile?</NavLink>
            </div>
        </div>
    )
    }
}

export default CreateAccount
