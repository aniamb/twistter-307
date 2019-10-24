import React, { Component } from 'react';
import {Switch, Route, NavLink,Redirect} from 'react-router-dom'
import Login from './Login'
import EditProfile from './EditProfile'
import './CreateAccount.css';
import axios from 'axios'
import { thisExpression } from '@babel/types';
import { timingSafeEqual } from 'crypto';

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
            isSubmitted: false,
            isReceived: null
        }
    }
    componentDidMount(){
        localStorage.clear();
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
        //this.validateForm();
    }

    handleHandleChange(event) {
        this.setState({handle: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        event.target.reset();
        const registerInfo = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password, handle: this.state.handle}
        axios.post('http://localhost:5000/register', registerInfo).then(response=> {
                localStorage.setItem("currentUser", response.data);
                 console.log('create account success');
                 this.setState({isReceived: true})
            })
            .catch((err)=> {
                this.setState({isReceived: false});
                console.log('create account fail');
            })
    }

    //return true-submits data to db
    validatePassword(form){
        var pass = form.password.value;
        var pass_conf = form.passwordConfirm.value;
        if(pass != pass_conf){
            alert("passwords don't match");
            //pass_conf.setCustomValidity("Passwords don't match");
            return false;
        }else{
            return true;
        }    
       } 
    

    render(){
    return (
        <div className="CreateAccount">
            <div className="inputBox">
                <h3> Create Account </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    First Name: <br/>
                    <input type="text" name="firstname"  value={this.state.firstname}
                    onChange={this.handleFirstNameChange.bind(this)} focus required/><br></br>
                    Last Name: <br/>
                    <input type="text" name="lastname" value={this.state.lastname}
                    onChange={this.handleLastNameChange.bind(this)} required/><br></br>
                    Email:<br/>
                    <input type="email" name="email" value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)} required/><br></br>
                    Password: <br/>
                    <input type="password" name="password" value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                    Confirm Password: <br/>
                    <input type="password" name="passwordConfirm" value={this.state.passwordConfirm}
                    onChange={this.handlePasswordConfirmChange.bind(this)} required/><br></br>
                    @ <br/>
                    <input type="text" name="handle" value={this.state.handle}
                    onChange={this.handleHandleChange.bind(this)} required/>
                    <input type="submit" value="Submit"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">Existing User?</NavLink><br></br>
                <NavLink to="/editprofile">Edit profile?</NavLink>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/editprofile'
                }}/>}
            </div>
        </div>
    )
    }
    
   


}


export default CreateAccount
