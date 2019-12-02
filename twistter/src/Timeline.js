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
            clicks: 0,
            show: true,
            searchTerm: '',
            postBody: '', // this is the post that the user make
            data:[], // list of strings that hyperlinks to profile
            navigate: false,
            errorMessage: false,
            value:"",
            topics:[]
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
        axios.post('http://localhost:5000/addmicroblogs', {postBody: this.state.postBody}).then(response=>{
            console.log("Posted from front end");
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

    handleChange = (evt) => {
      this.setState({
    value: evt.target.value
      });
    };

    handleKeyDown = (evt) => {
      if (['Enter', 'Tab', ','].includes(evt.key)) {
        evt.preventDefault();

        var topic = this.state.value.trim();
  
        const top = {topics: [...this.state.topics, topic]}
        

        axios.post('http://localhost:5000/topic', top).then(response=> {
                console.log('sent');
            })
            .catch((err)=> {
                console.log('failed');
            })

        if (topic) {
          this.setState({
            topics: [...this.state.topics, topic],
            value: ''
          });
        }
      }
    };

    handleDelete = (toBeRemoved) => {
      this.setState({
        topics: this.state.topics.filter(topic => topic !== toBeRemoved)
      });

      const top = {topics: this.state.topics.filter(topic => topic !== toBeRemoved)}
        

      axios.post('http://localhost:5000/topic', top).then(response=> {
              console.log('sent');
          })
          .catch((err)=> {
              console.log('failed');
          })
    };


    render() {
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
                      <div className="topics">
                        <form>
                        Create a new microblog: <br/>
                        {this.state.topics.map(topic => (
                          <div className="tag-topic" key={topic}>
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
                        <input type="text" placeholder="Text goes here.." maxLength="280" name="microblog" onChange={this.handlePostBody.bind(this)}/>
                        <br/>
                        <input type="submit" value = "Post!"/>
                        {this.state.errorMessage ? <p> Post must be less than 280 characters: </p> : '' }
                    </form>
                    </div>
                    <div className="microblogs">
                      <h3> @User: I really like tennis. </h3>
                      <div>
                          <p>Topics: Sports, Tennis, Nadal</p>
                        <button onClick={this.IncrementItem}>Favorite</button>
                        <button onClick={this.DecreaseItem}>Unfavorite</button>
                        { this.state.show ? <p>Likes: { this.state.clicks }</p> : '' }
                      </div>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: CS 307 is a interesting course. </h3>
                      <p>Topics: College, Purdue, Computer Science</p>
                      <div>
                        <button onClick={this.IncrementItem}>Favorite</button>
                        <button onClick={this.DecreaseItem}>Unfavorite</button>
                        { this.state.show ? <p>Likes: { this.state.clicks }</p> : '' }
                      </div>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: Boiler Up! </h3>
                      <p>Topics: Purdue University</p>
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
