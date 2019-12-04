import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search'
import Profile from './Profile'
import { Redirect, Link } from 'react-router-dom'
import CreateAccount from './CreateAccount'
import Timeline from './Timeline'
import Login from './Login'
import EditProfile from './EditProfile'
import UserProfile from './UserProfile'
import {Switch, NavLink, Route} from 'react-router-dom'
import GenericProfile from "./GenericProfile";
import axios from 'axios'
import Followers from "./Followers";
import Following from "./Following";

class App extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      userHandle:null
    }
  }

componentDidMount(){
  var currHandle = localStorage.getItem('currentUser');
  let params = {userHandle: currHandle}
  axios.post('/server/userprofile', params).then((response) => {
      console.log(currHandle);
      if(currHandle!=null){
        this.setState({userHandle: '@'+currHandle});
      }else{
        this.setState({userHandle: 'welcome'})
      }
    })
    .catch((err) => {
     console.log('error getting info');
    })
}
handleTheme(event){
  var checkeddd = document.getElementById("toggle").checked;
  var currTheme="light";
  console.log(checkeddd);
  if(checkeddd==true){
      document.documentElement.setAttribute('data-theme', 'dark');
      //localStorage.setItem('theme', 'dark');
      currTheme="dark";
      console.log(currTheme);
  }else if(checkeddd==false){
      document.documentElement.setAttribute('data-theme', 'light');
      //localStorage.setItem('theme', 'light');
      currTheme="light";
      console.log(currTheme);
  }
}
render() {
  return (
    <div className="App">
      <div className="App-header">


          <div style={{ textDecoration: "none", fontSize: "70px" }}>
            <Link to="/timeline"> Twistter</Link>
              <div className="topright"> 
              {this.state.userHandle} 
              </div>
              <div className="topright2">
              Dark Mode: <input type="checkbox" id="toggle" className="checkbox" onChange={this.handleTheme.bind(this)}/>
              <label htmlFor="toggle" className="switch" ></label> 
              </div>
            </div>

      

      </div>
        <Switch>
            <Route path="/createaccount" component={CreateAccount}/>
            <Route path="/login" component={Login}/>
            <Route path="/timeline" component={Timeline}/>
            <Route path="/editprofile" component={EditProfile}/>
            <Route path="/search" component={Search}/>
            <Route path="/userprofile" component={UserProfile}/>
            <Route path="/genericprofile" component={GenericProfile}/>
            <Route path="/followers" component={Followers}/>
            <Route path="/following" component={Following}/>

            <Route render= {() =>
                // <Timeline />
                <CreateAccount />
            }/>
        </Switch>

    {/*For testing purposes use above code. Final code should use code below. CreateAccount needs to be able to redirect*/}
    {/*<div className="App-header">*/}
    {/*  <h1>Twistter</h1>*/}
    {/*</div>*/}
    {/*  <Switch>*/}
    {/*      <Route path="/createaccount" component={CreateAccount}/>*/}
    {/*      <Route path="/login" component={Login}/>*/}
    {/*      <Route path="/editprofile" component={EditProfile}/>*/}
    {/*      /!* <Route path="/timeline" component={Timeline}/>*/}
    {/*      <Route render= {() =>*/}
    {/*        <Timeline /> *!/*/}
    {/*      <Route render= {() =>*/}
    {/*          <CreateAccount />*/}
    {/*         }/>*/}
    {/*  </Switch>*/}

    </div>

  );
}

}
export default App
