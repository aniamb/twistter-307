import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

class Timeline extends Component{
    render() {
        return (
            <div className="Timeline">
                {/*<header className="App-header">*/}
                {/*    <Navbar>*/}
                {/*        <Nav.Link href="#home">Home</Nav.Link>*/}
                {/*    </Navbar>*/}
                {/*    <div className="SearchBar">*/}
                {/*        <Form>*/}
                {/*            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
                {/*            <Button variant="outline-success">Search</Button>*/}
                {/*        </Form>*/}
                {/*    </div>*/}
                {/*    <Navbar>*/}
                {/*        <Nav.Link href="#profile">Profile Page</Nav.Link>*/}
                {/*    </Navbar>*/}
                {/*</header>*/}
                {/*<body>*/}
                {/*<h1> twistter </h1>*/}
                {/*</body>*/}

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
