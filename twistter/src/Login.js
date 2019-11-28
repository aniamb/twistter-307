import React, { Component } from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
//import { Alert } from 'react-alert'


import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isSubmitted: false,
            isRedirect: null,
            receivedRequest: false
        }
    }

    handleEmail = (ev)  => {
        this.setState({email: ev.target.value});
    }
    handlePassword = (ev) => {
        this.setState({password:ev.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        event.target.reset();
        this.setState({receivedRequest: true});
        const loginInfo = {email: this.state.email, password:this.state.password};
        axios.post('/server/login', loginInfo).then(response=> {
                localStorage.setItem("currentUser", response.data);
                this.setState({isRedirect: true});
            })
            .catch((err)=> {
                this.setState({isRedirect: false});
                alert('Invalid Email/Password');
            })

    };

    render(){
    return (
        <div className="Login">
            <div className="inputBox">
                <h3> Existing User Login! </h3>
                {/* <form action="http://localhost:5000/login" method="POST"> */}
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    Email:<br/> 
                    <input type="email" name="email" value={this.state.email} onChange={this.handleEmail.bind(this)} required /><br></br>
                    Password: <br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePassword.bind(this)} required/><br></br>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <NavLink to="/createaccount">New User?</NavLink>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/timeline'
                }}/>}
            </div>
        </div>

    )
    }
}

export default Login
