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
import Followers from "./Followers";
import Following from "./Following";

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <div style={{ textDecoration: "none", fontSize: "70px" }}>
         <Link to="/timeline"> Twistter</Link>
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

export default App;
