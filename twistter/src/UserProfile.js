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
            followingRedirect: false,
            userPosts: [],
            bio: "",
            emptyList: false,
            allTopics: [],
            emptyTopics: false
        }
    }

    componentDidMount(){
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/userprofile', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            var first = response.data.firstname;
            var last = response.data.lastname;
            var displayName = first.charAt(0).toUpperCase() + first.substring(1) + " " + last.charAt(0).toUpperCase() + last.substring(1);
            console.log(displayName);
            this.setState({userDisplayName: displayName});
            this.setState({userHandle: '@'+currHandle});
            this.setState({bio: response.data.bio});
            if(response.data.numTopics == true){
                this.setState({emptyTopics: true});
                this.setState({allTopics: response.data.userTopics});
            }
            console.log(response.data.numPosts);
           
            if (response.data.numPosts == false) {
                console.log("User has no posts");
                this.setState({emptyList: false})
            }else {
                console.log("u got mail");
                
                axios.get('http://localhost:5000/userposts', {
                    params: {
                        userHandle: currHandle
                      }
                }).then((response) => {
                    var first = response.data.firstname;
                    var last = response.data.lastname;
                  //  console.log(response.data.results);
                    this.setState({userPosts: response.data.results});
                    this.setState({emptyList: true});


                })
            }


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
        axios.get('http://localhost:5000/followers', {
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
        axios.get('http://localhost:5000/following', {
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
    let topicsToPost = [];
    let topicHolder = this.state.allTopics;
    console.log("NUM TOPICS " + this.state.emptyTopics)
    console.log(this.state.allTopics);
    if(this.state.emptyTopics){
        for(var i = 0; i < topicHolder.length; i++){
            topicsToPost.push(
                <span id = {topicHolder[i]} key = {topicHolder[i]} className = "topics">{topicHolder[i]}</span>
            )
         }
    } else {
        topicsToPost.push(
            <span id = {topicHolder[i]} key = {topicHolder[i]} className = "topics">No Topics</span>
        )
    }



    let posts = [];
    let microblogHolder = this.state.userPosts;
    let currHandle = localStorage.getItem('currentUser');
    if(!this.state.emptyList){
        posts.push(
            <div key={"empty list"} className="microblogs twist">
                You haven't written any posts. Head over to timeline to write a blog!
            </div>
        )
    }else {
        for (let i = 0; i < microblogHolder.length; i++) {
            let topicString = microblogHolder[i].topics.join(', ');
            let likeStatus;
            let quoteStatus;
            if (microblogHolder[i].likedUsers.includes(currHandle)) {
                likeStatus = "Unlike"; // user already liked the post
            } else {
                likeStatus = "Like";
            }
            if (microblogHolder[i].quotedUsers.includes(currHandle)) {
                quoteStatus = "Quoted"; // user already quoted the post and can't unquote
            } else {
                quoteStatus = "Quote";
            }
            posts.push(
                <div id={microblogHolder[i]._id} key={microblogHolder[i]._id} className="microblogs twist">
                    <h2>@{microblogHolder[i].username}: {microblogHolder[i].postBody}</h2>
                    <h3>Topics: {topicString}</h3> {/* Check if it still works if topics is a list */}
                    <div className="postInfo">
                        {/* <button onClick={() => this.handleLikes(microblogHolder[i]._id)}
                                className="likeButton">{likeStatus}</button> */}
                        <p className="likeCount">Likes: {microblogHolder[i].likes}</p>
                        <p className="quoteCount">Quotes: {microblogHolder[i].quoteCount}</p>
                        {/* <button onClick={() => this.handleQuotes(microblogHolder[i]._id)}
                                className="quoteButton">{quoteStatus}</button> */}
                    </div>
                </div>
            )
        }
    }
    return (
        <div className="UserProfile">
        <br/>
            <div className="row">
                {/* User Profile */}
                <div className="column">
                    {/* <button className = "redirect"><img id="settings" onClick = {this.editProfileRedirect}/></button> */}
                    <button className = "redirect" id="settings" onClick = {this.editProfileRedirect}>Edit Profile</button>
                    {this.state.editRedirect ? <Redirect to='/editprofile'/> : null}
                        <div className="circle"/>
                        <br/>
                        <h3>{this.state.userDisplayName}</h3>
                        <h6>{this.state.userHandle}</h6>
                        <p>{this.state.bio}</p>
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
                                {/* <span className = "topics">CS</span>
                                <span className = "topics">Math</span>
                                <span className = "topics">English</span>
                                <span className = "topics">History</span> */}
                                {topicsToPost}
                            </p>
                </div>
                <div className='double-column'>
                    {posts}
                    {/* <div className='twist'>
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
                    </div> */}
                </div>
            </div>

    </div>
    )
    }
}

export default UserProfile
