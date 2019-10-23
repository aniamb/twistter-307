import React, {Component} from 'react';
//import logo from './logo.svg';
//import Search from './Search'
import './App.css';
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
            data:[], // list of strings that hyperlinks to profile
            navigate: false
        }
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
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

    IncrementItem = () => {
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
                                    // state: {"list": "Albert"}
                                    state: {"list": this.state.data}
                                }}/>}
                            </li>
                        </ul>
                    </div>
                  </div>
                  <div className="microOrder">
                    <div className="microblogs">
                    <form action="http://localhost:5000/addmicroblogs" method="post">
                        {/*Redirect to search in backend*/}
                        Create a new microblog: <br/>
                        <input type="text" placeholder="Text goes here.." name="microblog"></input>
                        <br/>
                        <button type="submit">Post!</button>
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
