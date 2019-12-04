import React, {Component} from 'react';
import Chips, { Chip } from 'react-chips'

//import logo from './logo.svg';
//import Search from './Search'
import './App.css';
import './Timeline.css';
import './Topics.css';

// import { Route, NavLink, Redirect, Link } from 'react-router-dom'
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'

class Timeline extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: true,
            searchTerm: '',
            postBody: '',
            data:[], // list of strings that hyperlinks to profile
            navigate: false,
            errorMessage: false,
            value:"",
            topics:[],
            emptyList: false,
            microblogs: [] // list of microblogs to show
        }
    }

    componentDidMount(){
        var currHandle = localStorage.getItem('currentUser');
        let followParams = {currUser: currHandle};
        axios.post('/server/getfollowing', followParams).then((response) => {
            // console.log(response.data.results); // pass the results into
            console.log(typeof response.data.results);
            console.log(response.data.results.length);
            let params = {currUser: currHandle, followingList: response.data.results};
            if(response.data.results.length !== 0) {
                axios.post('/server/getmicroblogs', params).then((response) => {
                    console.log("Status is: " + response.status);
                    console.log(response.data.results);
                    this.setState({microblogs: response.data.results});
                })
            }else{
                this.setState({emptyList: true})
            }
        }).catch((err) => {
                console.log('error getting info');
        })
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    handlePostBody = (ev) => {
        this.setState({postBody: ev.target.value});
    };

    handleClick(event){ // handles search transition
        event.preventDefault();
        console.log("This is the state:" + this.state.navigate);
        axios.post('/server/searchserver', {searchTerm : this.state.searchTerm}).then(response=>{
            console.log('Search is complete')

            // fetch for response here
            console.log(response.data.results);
            this.setState({data: this.state.data.concat([response.data.results])})

            this.setState({navigate: true});
        }).catch((err)=>{
            console.log("Search function failed");
            this.setState({navigate: false});
        })
    };

    handleBlogPosting(event){ // handles blog posting
        event.preventDefault(); // should actually stay in default no redirection happens
        var currHandle = localStorage.getItem('currentUser');
        axios.post('/server/addmicroblogs', {username: currHandle, postBody: this.state.postBody, likes: 0, quoteCount: 0, likedUsers: [], quotedUsers: [], topics: this.state.topics}).then(response=>{
            console.log(response.data.results);
            this.setState({errorMessage: false});
            document.forms["blogID"].reset();
            axios.post('/server/addtopics', {username: currHandle, topics: this.state.topics}).then(response=>{
                console.log("Finished updating");
            })
        }).catch((err)=>{
            this.setState({errorMessage: true});
            document.forms["blogID"].reset();
        })

    }

    handleLikes(uniqueKey){
        let currUser = localStorage.getItem('currentUser');
        let likeCountString = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeCount")[0].textContent;
        let status = document.getElementById(uniqueKey).getElementsByClassName("postInfo")[0].getElementsByClassName("likeButton")[0].textContent;
        let intCountString = parseInt(likeCountString.charAt(likeCountString.length -1));
        if(status === "Like"){
            axios.post('/server/updatelikes', {
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
            axios.post('/server/updatelikes', {
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
            axios.post('/server/updateQuotes',{
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

    handleChange = (evt) => {
      this.setState({
    value: evt.target.value
      });
    };

    handleKeyDown = (evt) => {

        if (['Enter', 'Tab', ','].includes(evt.key)) {
            evt.preventDefault();

        var topic = this.state.value.trim();
        if (topic) {
            let tempTopics = this.state.topics;
            tempTopics.push(topic);
            this.setState({topics: tempTopics});
            this.setState({value: ""});
        }
        console.log(this.state.topics);
      }
    };

    handleDelete = (toBeRemoved) => {
        let tempTopics = this.state.topics;
        tempTopics.splice(tempTopics.indexOf(toBeRemoved),1);
        this.setState({topics: tempTopics});
    };


    render() {
        let posts = [];
        let microblogHolder = this.state.microblogs;
        let currHandle = localStorage.getItem('currentUser');
        if(this.state.emptyList){
            posts.push(
                <div key={"empty list"} className="microblogs">
                    You aren't following any users! To see posts in your timeline, search some users to follow. 
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
                    <div id={microblogHolder[i]._id} key={microblogHolder[i]._id} className="microblogs">
                        <h2>@{microblogHolder[i].username}: {microblogHolder[i].postBody}</h2>
                        <h3>Topics: {topicString}</h3> {/* Check if it still works if topics is a list */}
                        <div className="postInfo">
                            <button onClick={() => this.handleLikes(microblogHolder[i]._id)}
                                    className="likeButton">{likeStatus}</button>
                            <p className="likeCount">Likes: {microblogHolder[i].likes}</p>
                            <p className="quoteCount">Quotes: {microblogHolder[i].quoteCount}</p>
                            <button onClick={() => this.handleQuotes(microblogHolder[i]._id)}
                                    className="quoteButton">{quoteStatus}</button>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="Timeline">
                <div className="row-timeline">
                  <div className="sidebar" >
                        <div className="links">
                          <header>
                            <ul className="navLinks">

                                <li><NavLink to="/userprofile">My Profile</NavLink></li>
                                <li>
                                    <form onSubmit={this.handleClick.bind(this)}>
                                        {/*Redirect to search in backend*/}
                                        <label htmlFor="searchparam">Search users:
                                        <br></br>
                                        <input type="text"  name="searchparam" onChange={this.handleSearch.bind(this)}></input>
                                        </label>
                                        <br/>
                                        <input type="submit" value="Click to Search"/>
                                    </form>
                                    <br/>
                                    {this.state.navigate && <Redirect to={{
                                        pathname: '/search',
                                        state: {"list": this.state.data}
                                    }}/>}
                                </li>
                            </ul>
                            </header>
                        </div>
                    </div>
                    <div className="microOrder">
                        <div className="microblogs">
                            <div className="topics-enter">
                                <form >
                                    Tag your post with topics: <br/>
                                    {this.state.topics.map(topic => (
                                        <div className="tag-topic-list" key={topic}>
                                            {topic}

                                            <button
                                                type="button"
                                                className="button"
                                                onClick={() =>  this.handleDelete(topic)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        placeholder="Enter Topics:"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        onKeyDown={this.handleKeyDown}
                                    />
                                </form>
                            </div>
                            <form id="blogID" onSubmit={this.handleBlogPosting.bind(this)}>
                                <br/>
                                <label for="microblog">Create a new microblog: <br></br>
                                  <textarea rows="4" cols="20" placeholder="Text goes here.." maxLength="280" name="microblog" onChange={this.handlePostBody.bind(this)}></textarea>
                                </label>
                                <br/>
                                <input type="submit" value = "Post!"/>
                                {this.state.errorMessage ? <p> Post must be less than 280 characters: </p> : '' }
                            </form>
                        </div>
                        {posts}
                    </div>
                </div>
            </div>

        );
    }
}
export default Timeline;
