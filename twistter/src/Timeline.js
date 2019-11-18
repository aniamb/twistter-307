import React, {Component} from 'react';
//import logo from './logo.svg';
//import Search from './Search'
import './App.css';
import './Timeline.css';

// import { Route, NavLink, Redirect, Link } from 'react-router-dom'
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'

class Timeline extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicks: 0,
            show: true,
            searchTerm: '',
            postBody: '',
            data:[], // list of strings that hyperlinks to profile
            navigate: false,
            errorMessage: false,
            microblogs: [] // list of microblogs to show
        }
    }

    componentDidMount(){
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/getfollowing', {
            params: {
                currUser: currHandle
            }
        }).then((response) => {
            // console.log(response.data.results); // pass the results into
            axios.get('http://localhost:5000/getmicroblogs', {
                params: {
                    followingList : response.data.results
                }
            }).then((response) =>{
                console.log(response.data.results[0].blogs.topics);
                this.setState({microblogs : response.data.results});
            })
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
        axios.post('http://localhost:5000/searchserver', {searchTerm : this.state.searchTerm}).then(response=>{
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
        axios.post('http://localhost:5000/addmicroblogs', {postBody: this.state.postBody}).then(response=>{
            console.log(response.data.results);
            this.setState({errorMessage: false});
            document.forms["blogID"].reset();
        }).catch((err)=>{
            this.setState({errorMessage: true});
            document.forms["blogID"].reset();
        })

    }

    IncrementItem = () => { // TODO: increment and decrement should both be changes to the database
        // TODO: PASS IN THE KEY AND EDIT THE LIKECOUNT THAT WAY SO IT SHOWS AS SOON AS SOMEONE CLICKS IT
        this.setState({ clicks: this.state.clicks + 1 });
    }

    DecreaseItem = () => {
        this.setState({ clicks: this.state.clicks - 1 });
    }

    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }


    render() {
        let posts = [];
        let microblogHolder = this.state.microblogs;
        console.log(microblogHolder.length);
        for(let i = 0; i<microblogHolder.length; i++){
            let topicString = microblogHolder[i].blogs.topics.join(', ');
            posts.push(
                <div key={microblogHolder[i].blogs.uniqueID} className="microblogs">
                    <h2>@{microblogHolder[i].blogs.user}: {microblogHolder[i].blogs.microblog}</h2>
                    <h3>Topics: {topicString}</h3> {/* Check if it still works if topics is a list */}
                    <div>
                        <button>Favorite</button>
                        <button>Unfavorite</button>
                        <p>Likes: {microblogHolder[i].blogs.likeCount}</p>
                        <p>Quotes: {microblogHolder[i].blogs.quotes}</p>
                        <button>Quote</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="Timeline">
                <div className="row">
                    <div className="sidebar" >
                        <div className="links">
                            <ul className="navLinks">
                                <li><NavLink to="/timeline">Twistter</NavLink></li>
                                <li><NavLink to="/userprofile">My Profile</NavLink></li>
                                <li>
                                    <form onSubmit={this.handleClick.bind(this)}>
                                        {/*Redirect to search in backend*/}
                                        Search users: <br/>
                                        <input type="text" placeholder="Search.." name="searchparam" onChange={this.handleSearch.bind(this)}></input>
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
                        </div>
                    </div>
                    <div className="microOrder">
                        <div className="microblogs">
                            <form id="blogID" onSubmit={this.handleBlogPosting.bind(this)}>
                                Create a new microblog: <br/>
                                <input type="text" placeholder="Text goes here.." maxLength="280" name="microblog" onChange={this.handlePostBody.bind(this)}></input>
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