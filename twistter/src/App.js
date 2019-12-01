import React from 'react';
import './App.css';
import Search from './Search'
import CreateAccount from './CreateAccount'
import Timeline from './Timeline'
import Login from './Login'
import EditProfile from './EditProfile'
import UserProfile from './UserProfile'
import {Switch, Route} from 'react-router-dom'
import GenericProfile from "./GenericProfile";
import Followers from "./Followers";
import Following from "./Following";

function App() {
    var showLink = false;
    var noLink = false;
    var loggedIn = localStorage.getItem("currentUser");
    if(loggedIn){
        console.log("here");
        showLink = true;
    }else{
        console.log("here1")
        noLink = true;
    }
 
  return (
    <div className="App">
      <div className="App-header">
      {showLink && <a id="homeLink" href="/timeline"><h1 >Twistter</h1></a>}
      {noLink && <h1>Twistter</h1>}
       {/* <h1>Twistter</h1> */}
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
