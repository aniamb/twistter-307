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

    render() {
        var userNames = [];
        for(var i=0;i<this.props.location.state.list[0].length;i++){
            // for now locations is twitter.com
            // userNames.push(<div key={this.props.location.state.list[0][i]} className="searchResults"> <h3>@{this.props.location.state.list[0][i]} </h3></div> );
            userNames.push(
                <a key={this.props.location.state.list[0][i]} href="http://twitter.com">
                    <div className="searchResults">
                        <h3>
                            @{this.props.location.state.list[0][i]}
                        </h3>
                    </div>
                </a>
            );
        }
        return (

            <div className="Search">
              <h1> Search Results: </h1>
                <div className="row">
                  <div className="sidebar" >
                    <div className="links">
                        <ul className="navLinks">
                            <li><NavLink to="/timeline">Twistter</NavLink></li>
                            <li><NavLink to="/userprofile">My Profile</NavLink></li>
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
