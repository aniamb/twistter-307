import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


import './UserProfile.css';

class GenericProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timelineRedirect: false,
            userDisplayName: null,
            userHandle: null,
            status: null,
            following: false // determines whether or not current user follows the generic profile
        }
    }

    componentDidMount(){
        // var currHandle = localStorage.getItem('currentUser'); receive username
        axios.get('http://localhost:5000/userprofile', {
            params: {
                userHandle: this.props.location.state.username
            }
        }).then((response) => {
            var first = response.data.firstname;
            var last = response.data.lastname;
            var displayName = first.charAt(0).toUpperCase() + first.substring(1) + " " + last.charAt(0).toUpperCase() + last.substring(1);
            console.log(displayName);
            this.setState({userDisplayName: displayName});
            this.setState({userHandle: '@'+this.props.location.state.username});
            this.checkFollowingStatus(this.props.location.state.username);
        })
            .catch((err) => {
                console.log('error getting info');
            })
    }

    timelineRedirect = () => {
        this.setState({timelineRedirect: true});
    };

    checkFollowingStatus = (handle) => { // updates the following variable
        // axios post to check if user is following this generic profile.
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/searchFollowers',{
            params: {
                otherHandle: handle, // this is the user of the generic profile
                userHandle: currHandle // this is the current user looking at the profile
            }
        }).then((response)=>{
            // response will return a boolean. true will represent that currUser does follow
            if(response.data.follow){
                this.setState({following: true});
                this.setState({status: "Following"});
            }else{
                this.setState({following: false});
                this.setState({status: "Follow"});
            }
        })
    };

    updateFollowButton = () => {
        if (this.state.status==="Follow") { // user wants to follow the generic user
            // add axios call here
            let currHandle = localStorage.getItem('currentUser');
            axios.get('http://localhost:5000/followLogic', {
                params: {
                    otherHandle: this.props.location.state.username,
                    userHandle: currHandle,
                    follow: true
                }
            }).then((response)=>{
                this.setState({status: "Following"});
            }).catch((err)=>{
                console.log("INVALID FOLLOW REQUEST");
            });

        } else { // user wants to unfollow the generic user
            // add axios call here
            let currHandle = localStorage.getItem('currentUser');
            axios.get('http://localhost:5000/followLogic', {
                params: {
                    otherHandle: this.props.location.state.username,
                    userHandle: currHandle,
                    follow: false
                }
            }).then((response)=>{
                this.setState({status: "Follow"});
            }).catch((err)=>{
                console.log("INVALID UNFOLLOW REQUEST");
            })

        }
    };

    render(){
        return (
            <div className="UserProfile">
                <br/>
                <div className="container">
                    <div className="row">
                        {/* User Profile */}
                        <div className="column">
                            <button className = "redirect"><img id="settings" onClick = {this.timelineRedirect}/></button>
                            {this.state.timelineRedirect ? <Redirect to='/timeline'/> : null}
                            <div className="circle"/>

                            <br/>
                            <h3>{this.state.userDisplayName}</h3>
                            <h6>{this.state.userHandle}</h6>
                            <p>Team 1 Squad</p>
                            <hr/>
                            <button onClick={this.updateFollowButton}>{this.state.status}</button>
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
                                This is my first post
                            </div>
                            <div className='twist'>
                                Woah this is my second post
                            </div>
                            <div className='twist'>
                                Third post gang
                            </div>
                            <div className='twist'>
                                Fourth post
                            </div>
                            <div className='twist'>
                                Fifth post
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default GenericProfile
