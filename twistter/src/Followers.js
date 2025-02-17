import React, {Component} from 'react';
import './App.css';
import './Search.css'
import {NavLink, Redirect } from 'react-router-dom'

// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Followers extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigate: false, // only navigates to /search again
            username: "",
            currHandle: ""
        }
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    linkToProfile = (username) => {
        // console.log("THIS IS: " + username);
        this.setState({navigate : true});
        this.setState({username: username});
    };

    render() {
        let userNames = [];
        //this.setState({currHandle: localStorage.getItem('currentUser')});

        for(let i = 0; i< this.props.location.state.list[0].length; i++){
            userNames.push(
                <div key={this.props.location.state.list[0][i]} className="searchResults">
                    <h3>
                        <button onClick={() => this.linkToProfile(this.props.location.state.list[0][i])} >@{this.props.location.state.list[0][i]}</button>
                    </h3>
                </div>
            )
        }
        return (

            <div className="Followers">
              <h1> Followers!</h1>
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
                {this.state.navigate && <Redirect to={{
                    pathname: '/genericprofile',
                    state: {"username": this.state.username}
                }}/>}
                </div>
            </div>

        );
    }
}
export default Followers;
