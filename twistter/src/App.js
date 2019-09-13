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
        <div>
            <Navbar bg="light" expand="lg">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <div>
              <h1> Twistter </h1>
              </div>
            </Nav>
            <div>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            </div>
          </Navbar>
        </div>
      </header>
    </div>
  );
}

export default App;
