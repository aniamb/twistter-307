import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'



import './UserProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editRedirect: false,
            userDisplayName: null,
            userHandle: null,
            followerData: [],
            followingData: [],
            followerRedirect: false,
            followingRedirect: false
        }
    }

    componentDidMount(){
        var currHandle = localStorage.getItem('currentUser');
        let info = {userHandle: currHandle};
        axios.post('/server/userprofile', info).then((response) => {
            var first = response.data.firstname;
            var last = response.data.lastname;
            var displayName = first.charAt(0).toUpperCase() + first.substring(1) + " " + last.charAt(0).toUpperCase() + last.substring(1);
            console.log(displayName);
            this.setState({userDisplayName: displayName});
            this.setState({userHandle: '@'+currHandle});
          })
          .catch((err) => {
           console.log('error getting info');
          })
    }

    editProfileRedirect = () => {
      this.setState({editRedirect: true});
    };

    printFollowers = (ev)  => {
        // console.log("got into function")
        var currHandle = localStorage.getItem('currentUser');
        axios.get('/server/followers', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            // console.log('yeet' + response.data.results);
            this.setState({followerData: this.state.followerData.concat([response.data.results])})
            this.setState({followerRedirect: true});
            // console.log(this.state.followerData);
          })
          .catch((err) => {
           console.log('error getting info');
           this.setState({followerRedirect: false});

          })
    }

    printFollowing = (ev)  => {
        // console.log("got into function")
        var currHandle = localStorage.getItem('currentUser');
        axios.get('/server/following', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            // console.log('yeet' + response.data.results);
            this.setState({followingData: this.state.followingData.concat([response.data.results])})
            // console.log(this.state.followingData);
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
                    <button className = "redirect"><img id="settings" onClick = {this.editProfileRedirect}/></button>
                    {this.state.editRedirect ? <Redirect to='/editprofile'/> : null}
                        <div className="circle"/>
                        <br/>
                        <h3>{this.state.userDisplayName}</h3>
                        <h6>{this.state.userHandle}</h6>
                        <p>Team 1 Squad</p>
                        <hr/>
                        <button onClick = {this.printFollowers}>Followers</button>
                        {this.state.followerRedirect && <Redirect to={{
                                    pathname: '/followers',
                                    state: {"list": this.state.followerData}
                                }}/>}
                        <button onClick = {this.printFollowing}>Following</button>
                        {this.state.followingRedirect && <Redirect to={{
                                    pathname: '/following',
                                    state: {"list": this.state.followingData}
                                }}/>}
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

export default UserProfile
