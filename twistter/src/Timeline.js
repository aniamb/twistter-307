import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


import { Redirect } from 'react-router-dom'

class Timeline extends Component{
    render() {
        return (
            <div className="Timeline">

                <div className="links">
                    <ul className="navLinks">
                        <li>Twistter</li>
                        {/* <li><NavLink exact to="/">home</NavLink></li> */}
                        <li>My Profile</li>
                        <li>
                            <form>
                                <input type="text" placeholder="Search.." name="search"></input>
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}
export default Timeline;
