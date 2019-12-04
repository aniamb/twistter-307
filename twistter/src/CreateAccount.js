import React, { Component } from 'react';
import { NavLink,Redirect} from 'react-router-dom'
import './CreateAccount.css';
import axios from 'axios'

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
            isRedirect: null,
            //receivedRequest: false
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
    }

    handleHandleChange(event) {
        this.setState({handle: event.target.value})
    }

    handleSubmit(event){
        const { password, passwordConfirm } = this.state
        
        event.preventDefault();
        event.target.reset();
        const registerInfo = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm, handle: this.state.handle}
        if(password != passwordConfirm){
            alert("Passwords don't match");
        }else{
            axios.post('/server/register', registerInfo).then(response=> {
                localStorage.setItem("currentUser", response.data);
                 console.log('create account success');
                 this.setState({isRedirect: true})
            })
             .catch((err)=> {
                 this.setState({isRedirect: false});
                 console.log('create account fail');
                 alert("Email or handle already in use");
             })
            }
    }

    render(){
    return (
        <div className="CreateAccount">
            <div className="inputBox">
                <h3> Create Account </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label for="firstname">First Name: 
                        <br></br>
                        <input type="text" name="firstname"  value={this.state.firstname}
                            onChange={this.handleFirstNameChange.bind(this)} required/><br></br>
                    </label>
                    <label for="lastname">Last Name: 
                        <br></br>
                        <input type="text" name="lastname" value={this.state.lastname}
                            onChange={this.handleLastNameChange.bind(this)} required/><br></br>
                    </label>
                    <label for="email">Email: 
                        <br></br>
                        <input type="email" name="email" value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)} required/><br></br>
                    </label>
                    <label for="password">Password: 
                        <br></br>
                        <input type="password" name="password" value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                    </label>
                    <label for="passwordConfirm">Confirm Password: 
                        <br></br>
                        <input type="password" name="passwordConfirm" value={this.state.passwordConfirm}
                            onChange={this.handlePasswordConfirmChange.bind(this)} required/><br></br>
                    </label>
                    <label for="handle">@ 
                        <input type="text" name="handle" value={this.state.handle}
                            onChange={this.handleHandleChange.bind(this)} required/>
                    </label>
                    <input type="submit" value="Submit"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">Existing User?</NavLink><br></br>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/editprofile'
                }}/>}
            </div>
        </div>
    )
    }
    
   


}


export default CreateAccount
