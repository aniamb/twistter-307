import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'


import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isSubmitted: false,
        }
    }

    handleEmail = (ev)  => {
        this.setState({email: ev.target.value});
    }
    handlePassword = (ev) => {
        this.setState({password:ev.target.value});
    }
   
    // handleSubmit(event){ 
    //     event.preventDefault();
    //     fetch('http://localhost:5000/login', {
    //        method: 'POST',
    //        headers: {'Access-Control-Allow-Origin': '*'},
    //        body: JSON.stringify({
    //             "email": this.state.email,
    //             "password":this.state.password
    //        })
    //     });
    // };

    render(){
    return (
        <div className="Login">
            <div className="inputBox">
                <h3> Existing User Login! </h3>
                <form action="http://localhost:5000/login" method="POST">
                {/* <form onSubmit = {this.handleSubmit.bind(this)}> */}
                    Email:<br/> 
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmail.bind(this)} /><br></br>
                    Password: <br/>
                    <input type="text" name="password" value={this.state.password} onChange={this.handlePassword.bind(this)}/><br></br>
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