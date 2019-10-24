import React, { Component } from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'react-alert'

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
        axios.post('http://localhost:5000/login', loginInfo).then(response=> {
                console.log('user found through axios')
                this.setState({isRedirect: true});
            })
            .catch((err)=> {
                this.setState({isRedirect: false});
                alert('yuhhhhhh');
                console.log('user not found through axios');
            })
            console.log(this.state.isRedirect);

    };
    
    render(){
        const isValid = this.state.email.length > 0 || this.state.password.length > 0;
    return (
        <div className="Login">
            <div className="inputBox">
                <h3> Existing User Login! </h3>
                {/* <form action="http://localhost:5000/login" method="POST"> */}
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    Email:<br/> 
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmail.bind(this)} /><br></br>
                    Password: <br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePassword.bind(this)}/><br></br>
                    { isValid? null: <div className='invalid-feedback'>please enter email/password</div> }

                    {/* if(!this.state.isRedirect){
                        <div> ERROR</div> 
                    } else {
                        <div> NOT ERROR </div>
                    } */}

                        {/* {this.state.isRedirect? (
                            <div> should redirect </div>
                        ): (
                            <div> should not redirect must error</div> 
                        )} */}
                        {/* {this.state.receivedRequest && this.state.isRedirect && <div> should not redirect must error</div> }
                        {this.state.receivedRequest && this.state.isRedirect && <Redirect to={{
                    pathname: '/timeline'
                }}/>} */}

                    {/* isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )} */}

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