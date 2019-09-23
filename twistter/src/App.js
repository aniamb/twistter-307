import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
<<<<<<< HEAD
import EditProfile from './EditProfile'

=======
import Timeline from './Timeline.js'
>>>>>>> origin/master
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <div className="App-header">
      <h1>Twistter</h1>
    </div>
      <Switch>
<<<<<<< HEAD
        <Route path="/createaccount" component={CreateAccount}/>
        <Route path="/login" component={Login}/>
        <Route path="/editprofile" component={EditProfile}/>
        <Route render= {() =>
            <CreateAccount />
           }/>
    </Switch>
=======
          <Route path="/createaccount" component={CreateAccount}/>
          <Route path="/login" component={Login}/>
  //      <Route path="/timeline" component={Timeline}/>
  //      <Route render= {() =>
  //        <Timeline />
          <Route render= {() =>
              <CreateAccount />
             }/>
      </Switch>
>>>>>>> origin/master
    </div>

  );
}

export default App;
