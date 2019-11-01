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
            username:'',
            likes: 0,
            postBody: '',
            quoteCount: 0,
            topics:[], // this is the post that the user make
            data:[], // list of strings that hyperlinks to profile
            navigate: false,
            errorMessage: false
        }
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
        axios.post('http://localhost:5000/addmicroblogs', {username: window.localStorage.getItem('currentUser'), postBody: this.state.postBody, likes: 5, quoteCount: 5, topics:['nba','purdue']}).then(response=>{
            console.log(this.state.postBody);
            console.log(this.state.username);
            console.log(this.state.likes);
            console.log(this.state.quoteCount);
            console.log(this.state.topics);
            this.setState({errorMessage: false});
            document.forms["blogID"].reset();
        }).catch((err)=>{
            this.setState({errorMessage: true});
            document.forms["blogID"].reset();
        })

    }

    IncrementItem = () => { // TODO: increment and decrement should both be changes to the database
      this.setState({ clicks: this.state.clicks + 1 });
    }

    DecreaseItem = () => {
      this.setState({ clicks: this.state.clicks - 1 });
    }

    ToggleClick = () => {
      this.setState({ show: !this.state.show });
    }


    render() {
        return (
            <div className="Timeline">
                <div className="row">
                  <div className="sidebar" >
                    <div className="links">
                        <ul className="navLinks">
                            <li><NavLink to="/timeline">Twistter</NavLink></li>
                            <li>My Profile</li>
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
                    <div className="microblogs">
                      <h3> @User: I really like tennis. </h3>
                      <div>

                        <button onClick={this.IncrementItem}>Favorite</button>
                        <button onClick={this.DecreaseItem}>Unfavorite</button>
                        { this.state.show ? <p>Likes: { this.state.clicks }</p> : '' }
                      </div>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: CS 307 is a interesting course. </h3>
                      <div>
                        <button onClick={this.IncrementItem}>Favorite</button>
                        <button onClick={this.DecreaseItem}>Unfavorite</button>
                        { this.state.show ? <p>Likes: { this.state.clicks }</p> : '' }
                      </div>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: Boiler Up! </h3>
                      <div>
                        <button onClick={this.IncrementItem}>Favorite</button>
                        <button onClick={this.DecreaseItem}>Unfavorite</button>
                        { this.state.show ? <p>Likes: { this.state.clicks }</p> : '' }
                      </div>
                      <p> repost </p>
                    </div>
                  </div>
                </div>
            </div>

        );
    }
}
export default Timeline;
