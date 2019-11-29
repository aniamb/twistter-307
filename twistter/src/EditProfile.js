import React, { Component } from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import './EditProfile.css';
import axios from 'axios'

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            isSubmitted: false,
            currUser: null,
            timelineRedirect: false,
            deleteRedirect: false
        }
    }

    handleChange(event) {
        this.setState({bio: event.target.value})
    }

    handleDelete(event) {
        event.preventDefault();
        const delAccount = {currUser: localStorage.getItem('currentUser')};
        axios.post('http://localhost:5000/delete', delAccount).then(response=> {
            console.log("Bio is updated");
            this.setState({deleteRedirect: true});
        })
        .catch((err)=> {
            console.log('delete account failed')
            this.setState({deleteRedirect: false});

        })     
    }
    handleSubmit(event){
        event.preventDefault();
        event.target.reset();
        this.setState({receivedRequest: true});
        const updateBio = {bio: this.state.bio, currUser: localStorage.getItem('currentUser')};

        axios.post('http://localhost:5000/editprofile', updateBio).then(response=> {
                console.log('bio updated')
                this.setState({timelineRedirect: true});
            })
            .catch((err)=> {
                console.log('bio not updated');
                this.setState({timelineRedirect: false});
            })

    };
    render(){
    return (
        <div className="EditProfile">
            <div className="EditingBox">
                <h3> Edit Profile </h3>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    {/*Make a text area instead of a text box*/}
                    <label for="bio">Bio: 
                        <br></br>
                        <input type="text" name="bio" value={this.state.bio}
                            onChange={this.handleChange.bind(this)}/><br></br>
                    </label>
                    <input type="submit" value="Save Changes"/>
                    <br></br>
                    <input type="button" value="Delete" onClick={this.handleDelete.bind(this)}/>
                </form>
                {this.state.timelineRedirect && <Redirect to={{
                    pathname: '/timeline'
                }}/>}
            </div>


        </div>
    )
    }
}

export default EditProfile
