import React, {Component} from 'react';
import logo from './logo.svg';

import './App.css';
import { Route, NavLink, Redirect, Link } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigate: false
        }
    }

    handleClick = () => {
        this.setState({navigate: true});
    }



    render() {
        var userNames = [];
        for(var i=0;i<this.props.location.state.list[0].length;i++){
            userNames.push(<div className="searchResults"> <h3>@{this.props.location.state.list[0][i]} </h3></div> );
        }
        return (

            <div className="Search">
              <h1> Search Results: </h1>
                <div class="row">
                  <div className="sidebar" >
                    <div className="links">
                        <ul className="navLinks">
                            <li><NavLink to="/Timeline">Twistter</NavLink></li>
                            {/* <li><NavLink exact to="/">home</NavLink></li> */}
                            <li>My Profile</li>
                            <li>
                                <form action="http://localhost:5000/searchserver" method="post">
                                    {/*Redirect to search in backend*/}
                                    Search users: <br/>
                                    <input type="text" placeholder="Search.." name="searchparam"></input>
                                    <br/>
                                    <button type="submit">Click To Search<i className="fa fa-search"></i></button>
                                </form>
                            </li>
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
