import React, { Component } from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


import './UserProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
 render(){
    
    return (
        <div className="UserProfile">
        <br/>
         <div className="container">
            <div className="row">
                {/* User Profile */}
                <div className="column">
                    <img id="settings" src={require('/Users/netrapradhan/twistter-307/twistter/src/images/gear.png')}/>
                        <div className="circle"/>
                        <br/>
                        <h3>Netra Pradhan</h3>
                        <h6>@netrapradhan</h6>
                        <p>I hate 307 yolo swag</p>
                        <hr/>
                        <p>+Followers</p>
                        <p>+Following</p>
                        <p>My Topics</p>
                            <p>
                                <span id = "topics">CS</span>
                                <span id = "topics">Math</span>
                                <span id = "topics">English</span>
                                <span id = "topics">History</span> 
                            </p>
                </div>
                <div className='double-column'>
                    <div className='twist'>
                        Hate CS
                    </div>
                    <div className='twist'>
                        Love CS
                    </div>
                    <div className='twist'>
                        Hate CS
                    </div>
                    <div className='twist'>
                        Love CS
                    </div>
                    <div className='twist'>
                        Hate CS
                    </div>
                </div>
            </div>
        
        </div> 
    
    </div>  
    )
    }
}

export default UserProfile