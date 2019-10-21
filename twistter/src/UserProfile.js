import React, { Component } from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'

import './UserProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
 render(){
    return (
        <div className="UserProfile">
           <h1>USER PROFILE PAGE YA YEET</h1>
        </div>
        
    )
    }
}

export default UserProfile