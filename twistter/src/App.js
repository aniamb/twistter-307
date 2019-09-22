import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'

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
        <Route render= {() =>
            <CreateAccount />
           }/>
    </Switch>
    </div>
  );
}

export default App;
