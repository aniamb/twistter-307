import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline'
import Search from './Search'
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
            <Route path="/search" component={Search}/>
            <Route render= {() =>
                <Timeline />
            }/>
        </Switch>

    </div>

  );
}

export default App;
