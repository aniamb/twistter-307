import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import Login from './Login'

class CreateAccount extends Component {
    render(){
    return (
        <div className="CreateAccount">
            <div className="inputBox">
                <h3> Create Account </h3>
                <form>
                    First Name: <br/>
                    <input type="text" name="firstname" value="" focus/><br></br>
                    Last Name: <br/>
                    <input type="text" name="lastname" value=""/><br></br>
                    Email:<br/> 
                    <input type="text" name="email" value="" /><br></br>
                    Password: <br/>
                    <input type="text" name="password" value=""/><br></br>
                    Confirm Password: <br/>
                    <input type="text" name="passwordConfirm" value=""/><br></br>
                    @ <br/> 
                    <input type="text" name="handle" value=""/><br></br>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <NavLink to="/login">Existing User?</NavLink>
            </div>
        
        </div>
    )
    }
}

export default CreateAccount