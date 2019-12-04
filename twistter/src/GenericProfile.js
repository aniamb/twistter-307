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
            userPosts: [],
            bio: "",
            emptyList: false,
            allTopics: [],
            emptyTopics: false
        }
    }

    componentDidMount(){
        // var currHandle = localStorage.getItem('currentUser'); receive username
        let data = {userHandle: this.props.location.state.username};
        axios.post('/server/userprofile', data).then((response) => {
            var first = response.data.firstname;
            this.setState({firstName: first.charAt(0).toUpperCase() + first.substring(1)+"'s"});
            var last = response.data.lastname;
            var displayName = first.charAt(0).toUpperCase() + first.substring(1) + " " + last.charAt(0).toUpperCase() + last.substring(1);
            console.log(displayName);
            this.setState({userDisplayName: displayName});
            this.setState({userHandle: '@'+this.props.location.state.username});
            this.setState({bio:response.data.bio});
            this.checkFollowingStatus(this.props.location.state.username);
            if(response.data.numTopics == true){
                this.setState({emptyTopics: true});
                this.setState({allTopics: response.data.userTopics});
            }
        if (response.data.numPosts == false) {
                console.log("User has no posts");
                this.setState({emptyList: false})
            }else {
                console.log("u got mail");
                
                axios.get('http://localhost:5000/userposts', {
                    params: {
                        userHandle: this.props.location.state.username
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

    timelineRedirect = () => {
        this.setState({timelineRedirect: true});
    };

    checkFollowingStatus = (handle) => { // updates the following variable
        // axios post to check if user is following this generic profile.
        var currHandle = localStorage.getItem('currentUser');
        let params = {otherHandle: handle, currHandle: currHandle};
        axios.post('/server/searchFollowers',params).then((response)=>{
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
            let paramsFollow = {otherHandle: this.props.location.state.username, userHandle: currHandle, follow: true};
            axios.post('/server/followLogic', paramsFollow).then((response)=>{
                this.setState({status: "Following"});
            }).catch((err)=>{
                console.log("INVALID FOLLOW REQUEST");
            });

        } else { // user wants to unfollow the generic user
            // add axios call here
            let currHandle = localStorage.getItem('currentUser');
            let paramsUnfollow = {otherHandle: this.props.location.state.username, userHandle: currHandle, follow: false};
            axios.post('/server/followLogic', paramsUnfollow).then((response)=>{
                this.setState({status: "Follow"});
            }).catch((err)=>{
                console.log("INVALID UNFOLLOW REQUEST");
            })

        }
    };

    printFollowers = (ev)  => {
        console.log("got into function")
        var currHandle = this.props.location.state.username;
        let params = {userHandle : currHandle};
        axios.post('/server/followers', params).then((response) => {
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
        let params = {userHandle: currHandle};
        axios.post('/server/following', params).then((response) => {
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
    handleLikes(uniqueKey){
        let currUser = localStorage.getItem('currentUser');
        let likeCountString = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeCount")[0].textContent;
        let status = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeButton")[0].textContent;
        let intCountString = parseInt(likeCountString.charAt(likeCountString.length -1));
        if(status === "Like"){
            axios.post('http://localhost:5000/updatelikes', {
                currUser: currUser,
                likeCount: intCountString + 1,
                microblogID: uniqueKey,
                status: "like"
            }).then((response)=>{
                intCountString+=1;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeCount")[0].textContent = "Likes: " + intCountString;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeButton")[0].textContent = "Unlike";
            }).catch((err)=>{
                console.log("Failed to update like count");
            })
        }else{
            axios.post('http://localhost:5000/updatelikes', {
                currUser: currUser,
                likeCount: intCountString - 1,
                microblogID: uniqueKey,
                status: "unlike"
            }).then((response)=>{
                intCountString-=1;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeCount")[0].textContent = "Likes: " + intCountString;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeButton")[0].textContent = "Like";
            }).catch((err)=>{
                console.log("Failed to update like count");
            })
        }


    }
    handleQuotes(uniqueKey){
        let currUser = localStorage.getItem('currentUser');
        let quoteString = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("quoteCount")[0].textContent;
        let status = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("quoteButton")[0].textContent;
        let intCountString = parseInt(quoteString.charAt(quoteString.length -1));
        if(status === "Quote"){ // user wants to quote post
            axios.post('http://localhost:5000/updateQuotes',{
                currUser: currUser,
                quoteCount: intCountString +1,
                microblogID: uniqueKey
            }).then((response)=>{
                intCountString += 1;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("quoteCount")[0].textContent = "Quotes: " + intCountString;
                document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("quoteButton")[0].textContent = "Quoted";
            }).catch((err)=>{
                console.log("Failed to quote");
            })
        } // User not allowed to unquote

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
                This user has no posts!
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
                        <button onClick={() => this.handleLikes(microblogHolder[i]._id)}
                                className="likeButton">{likeStatus}</button>
                        <button onClick={() => this.handleQuotes(microblogHolder[i]._id)}
                                className="quoteButton">{quoteStatus}</button>
                        <p className="likeCount">Likes: {microblogHolder[i].likes}</p>
                        <p className="quoteCount">Quotes: {microblogHolder[i].quoteCount}</p>
                        
                    </div>
                </div>
            )
        }
    }
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
                            <p>{this.state.bio}</p>
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
                                {topicsToPost}
                            </p>
                        </div>
                        <div className='double-column'>
                            {posts}
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default GenericProfile
