import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import './EditProfile.css';
import axios from 'axios'

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            isSubmitted: false,
            currUser: null
        }
    }

    handleChange(event) {
        this.setState({bio: event.target.value})
    }

    handleDelete(event) {
        event.preventDefault();
        const delAccount = {currUser: localStorage.getItem('currentUser')};
        axios.post('http://localhost:5000/delete', delAccount).then(response=> {
            console.log('account deleted')
            //this.setState({isRedirect: true});
        })
        .catch((err)=> {
            //this.setState({isRedirect: false});
            console.log('delete account failed')
        })     
    }
    
    handleSubmit(event){
        event.preventDefault();
        event.target.reset();
        this.setState({receivedRequest: true});
        const updateBio = {bio: this.state.bio, currUser: localStorage.getItem('currentUser')};

        axios.post('http://localhost:5000/editprofile', updateBio).then(response=> {
                console.log('bio updated')
                //this.setState({isRedirect: true});
            })
            .catch((err)=> {
                //this.setState({isRedirect: false});
                //alert('Invalid Email/Password');
                console.log('bio not updated')
            })

    };
    render(){
    return (
        <div className="EditProfile">
            <div className="EditingBox">
                <h3> Edit Profile </h3>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    {/*Make a text area instead of a text box*/}
                    Bio: <br/>
                    <input type="text" name="bio" value={this.state.bio}
                    onChange={this.handleChange.bind(this)}/><br></br>
                    <input type="submit" value="Save Changes"/>
                    <br></br>
                    <input type="button" value="Delete" onClick={this.handleDelete.bind(this)}/>
                </form>
            </div>


        </div>
    )
    }
}

export default EditProfile
