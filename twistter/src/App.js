import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
import EditProfile from './EditProfile'
import Timeline from './Timeline.js'
import UserProfile from './UserProfile'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <div className="App-header">
      <h1>Twistter</h1>
    </div>
      <Switch>
          <Route path="/createaccount" component={CreateAccount}/>
          <Route path="/login" component={Login}/>
          <Route path="/editprofile" component={EditProfile}/>
          <Route path="/timeline" component={Timeline}/>
          <Route path="/userprofile" component={UserProfile}/>
          <Route render= {() =>
              <UserProfile />
             }/>
      </Switch>
    </div>

  );
}

export default App;
