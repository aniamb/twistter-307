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
            following: false, // determines whether or not current user follows the generic profile
            followerData: [],
            followingData: [],
            followerRedirect: false,
            followingRedirect: false,
            firstName: "",
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
            this.setState({firstName: first.charAt(0).toUpperCase() + first.substring(1)+"'s"});
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

    printFollowers = (ev)  => {
        console.log("got into function")
        var currHandle = this.props.location.state.username;
        axios.get('http://localhost:5000/followers', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            console.log(response.data.results);
            this.setState({followerData: this.state.followerData.concat([response.data.results])})
            this.setState({followerRedirect: true});
            console.log(this.state.followerData);
          })
          .catch((err) => {
           console.log('error getting info');
           this.setState({followerRedirect: false});

          })
    }

    printFollowing = (ev)  => {
        console.log("got into function")
        var currHandle = this.props.location.state.username;
        axios.get('http://localhost:5000/following', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            console.log('yeet' + response.data.results);
            this.setState({followingData: this.state.followingData.concat([response.data.results])})
            console.log(this.state.followingData);
            this.setState({followingRedirect: true});

          })
          .catch((err) => {
           console.log('error getting info');
           this.setState({followingRedirect: false});
          })
    }

    render(){
        return (
            <div className="UserProfile">
                <br/>
                <div className="container">
                    <div className="row">
                        {/* User Profile */}
                        <div className="column">
                            {/* <button className = "redirect"><img id="settings" onClick = {this.timelineRedirect}/></button> */}
                            {/* <button className = "redirect" id="settings" onClick = {this.timelineRedirect}>Timeline</button>
                            {this.state.timelineRedirect ? <Redirect to='/timeline'/> : null} */}
                            <div className="circle"/>

                            <br/>
                            <h3>{this.state.userDisplayName}</h3>
                            <h6>{this.state.userHandle}</h6>
                            <p>Team 1 Squad</p>
                            <hr/>
                            <button onClick={this.updateFollowButton}>{this.state.status}</button>
                            <button onClick = {this.printFollowers}>{this.state.firstName} Followers</button>
                        {this.state.followerRedirect && <Redirect to={{
                                    pathname: '/followers',
                                    state: {"list": this.state.followerData}
                                }}/>}
                        <button onClick = {this.printFollowing}>{this.state.firstName} Following</button>
                        {this.state.followingRedirect && <Redirect to={{
                                    pathname: '/following',
                                    state: {"list": this.state.followingData}
                                }}/>}
                            <p>My Topics</p>
                            <p>
                                <span className = "topics">CS</span>
                                <span className = "topics">Math</span>
                                <span className = "topics">English</span>
                                <span className = "topics">History</span>
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
