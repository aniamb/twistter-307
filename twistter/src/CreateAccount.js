import React, { Component } from 'react';
import './CreateAccount.css';

class CreateAccount extends Component {
    render(){
    return (
        <div className="CreateAccount">
            <div className="inputBox">
                <h1> TWISTTER </h1>
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
                    <input type="text" name="passwordConfirm" value=""/><br></br>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                Existing User?
            </div>

           
        
        
        
        
        
        </div>
    )
    }
}

export default CreateAccount