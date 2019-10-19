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
            searchTerm: '',
            navigate: false
        }
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    handleClick(event){ // handles search transition
        event.preventDefault();
        console.log("This is the state:" + this.state.navigate);
        var searchTerm = {searchTerm: this.state.searchTerm};
        axios.post('http://localhost:5000/searchserver', searchTerm).then(response=>{
            console.log('Search is complete')
            this.setState({navigate: true});
            // fetch for response here
        })
            .catch((err)=>{
                console.log("Search function failed");
                this.setState({navigate: false});
            })
    };

    render() {
        return (
            <div className="Timeline">
                <div className="row">
                  <div className="sidebar" >
                    <div className="links">
                        <ul className="navLinks">
                            <li><NavLink to="/Timeline">Twistter</NavLink></li>
                            {/* <li><NavLink exact to="/">home</NavLink></li> */}
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
                                    pathname: '/search'
                                }}/>}
                            </li>
                        </ul>
                    </div>
                  </div>
                  <div className="microOrder">
                    <div className="microblogs">
                      <h3> @User: I really like tennis. </h3>
                      <p> favorite </p>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: CS 307 is a interesting course. </h3>
                      <p> favorite </p>
                      <p> repost </p>
                    </div>
                    <div className="microblogs">
                      <h3> @User: Boiler Up! </h3>
                      <p> favorite </p>
                      <p> repost </p>
                    </div>
                  </div>
                </div>
            </div>

        );
    }
}
export default Timeline;
