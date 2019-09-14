import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


function App() {



  return (
    <div className="App">
      <header className="App-header">
          <Navbar>
              <Nav.Link href="#home">Home</Nav.Link>
          </Navbar>
          <div className="SearchBar">
            <Form>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>
      </header>
      <body>
        <h1> twistter </h1>
      </body>

    </div>

  );
}

export default App;
