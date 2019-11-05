import React, {Component} from 'react';
import './App.css';
import './Search.css'
import { Route, NavLink, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigate: false, // only navigates to /search again
        }
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    testCallback = (username) => {
        console.log("THIS IS: " + username);
    };

    render() {
        let userNames = [];
        for(let i = 0; i< this.props.location.state.list[0].length; i++){
            userNames.push(
                <div key={this.props.location.state.list[0][i]} className="searchResults">
                    <h3>
                        <button onClick={() => this.testCallback(this.props.location.state.list[0][i])} >@{this.props.location.state.list[0][i]}</button>
                    </h3>
                </div>
            )
        }
        return (

            <div className="Search">
              <h1> Search Results: </h1>
                <div className="row">
                  <div className="sidebar" >
                    <div className="links">
                        <ul className="navLinks">
                            <li><NavLink to="/timeline">Twistter</NavLink></li>
                            <li>My Profile</li> {/* This needs to be a link */}
                        </ul>
                    </div>
                  </div>
                  <div className="userOrder">
                      {userNames}
                  </div>
                </div>
            </div>

        );
    }
}
export default Search;
