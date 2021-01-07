import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import { render } from 'react-dom';

class NavbarComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={}

  }


render(){

    return(
      <Route>

        <div>
    
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Dr.Mohammad Abo Hilal</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>

      <Nav.Link href="#link">Researches</Nav.Link>
      <Nav.Link href="#link">QuestionsPage</Nav.Link>
      <NavDropdown title="Resources" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Articels</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Videos </NavDropdown.Item>
        <NavDropdown.Item href="/books">Books </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.4">links</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#link">Contact Us</Nav.Link>
      <Nav.Link href="#link">Who are We</Nav.Link>

    </Nav>                               
        <NavDropdown title="En" id="basic-nav-dropdown" >
        <NavDropdown.Item href="#action/3.1">Ar</NavDropdown.Item>
      </NavDropdown>


     <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

<Route path="/books"exact render={() => <books/>} />


</div>
</Route>

    );
}
}
export default NavbarComponent;
