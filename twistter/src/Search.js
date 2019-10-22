import React, {Component} from 'react';
import './App.css';
import { Route, NavLink, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigate: false, // only navigates to /searhc again
            searchTerm: '',
            data: [] // list of strings that hyperlink to profile
        }
    }

    handleClick(event){
        event.preventDefault();
        var searchTerm = {searchTerm: this.state.searchTerm};
        axios.post('http://localhost:5000/searchserver', searchTerm).then(response=>{
            console.log('Search is complete');

            // fetch for response here
            console.log(response.data.results);
            this.setState({data: this.state.data.concat([response.data.results])})

            this.setState({navigate: true});
        }).catch((err)=>{
                console.log("Search function failed");
                this.setState({navigate: false});
        })
    };



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
                                <form onSubmit={this.handleClick.bind(this)}>
                                    {/*Redirect to search in backend*/}
                                    Search users: <br/>
                                    <input type="text" placeholder="Search.." name="searchparam"></input>
                                    <br/>
                                    <button type="submit">Click To Search<i className="fa fa-search"></i></button>
                                </form>
                                <br/>
                                {this.state.navigate &&<Redirect to={{
                                    pathname: '/search',
                                    // state: {"list": this.state.data}
                                    // for some reason this.state.data is not a list
                                    // parsing logic may have to be changed depending on how mongoose sends data back
                                    state: {"list" : ["Testing", "Testing2"]}
                                    // this would return @T, @e, ... and not look at Testing2
                                }}/>}
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
