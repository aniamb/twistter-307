import React, {Component} from 'react';
import logo from './logo.svg';
import Search from './Search'
import './App.css';
import { Route, NavLink, Redirect, Link } from 'react-router-dom'

class Timeline extends Component{
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
        return (
            <div className="Timeline">
                <div className="links">
                    <ul className="navLinks">
                        <li><NavLink to="/Timeline">Twistter</NavLink></li>
                        {/* <li><NavLink exact to="/">home</NavLink></li> */}
                        <li>My Profile</li>
                        <li>
                            <form action="/search" method="post">
                                Search users: <br/>
                                <input type="text" placeholder="Search.." name="searchparam"></input>
                                <br/>
                                <button type="submit">Click To Search<i className="fa fa-search"></i></button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}
export default Timeline;
