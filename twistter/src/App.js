import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App-header">
          <h1>Twistter</h1>
      </div>
        <Switch>
            <Route path="/timeline" component={Timeline}/>
            <Route render= {() =>
                <Timeline />
            }/>
        </Switch>

    </div>

  );
}

export default App;
