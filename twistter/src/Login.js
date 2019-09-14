import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'

import './Login.css';

class Login extends Component {
    render(){
    return (
        <div className="Login">
            <div className="inputBox">
                <h1> TWISTTER </h1>
                <h3> Existing User Login! </h3>
                <form>
                    Email:<br/> 
                    <input type="text" name="email" value="" /><br></br>
                    Password: <br/>
                    <input type="text" name="password" value=""/><br></br>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <NavLink to="/createaccount">New User?</NavLink>
            </div>
        </div>
    )
    }
}

export default Login