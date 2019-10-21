import React, {Component} from 'react';
import logo from './logo.svg';
import Search from './Search'
import './App.css';
import { Route, NavLink, Redirect, Link } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Timeline extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicks: 0,
            navigate: false,
            show: true

        }
    }

    handleClick = () => {
        this.setState({navigate: true});
    }

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
