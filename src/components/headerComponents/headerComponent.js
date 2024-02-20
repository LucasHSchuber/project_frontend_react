import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

//import css
import '../../assets/css/header.css';
// import logo from '../../assets/images/mountain2.png';


//header
function Header() {

  const [expanded, setExpanded] = useState(false);


  const handleLinkClick = () => {
    setExpanded(false);
  }

  return (
    <Navbar expanded={expanded} className='header' expand="lg">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/index" className='navbar-brand-link' >
            Space
            {/* <img className="logo-img" src={logo} alt="logo img" ></img> */}
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          aria-controls="responsive-navbar-nav"
        >
          {(!expanded ? <i className="navbar-toggle-icon fa-solid fa-bars"></i> : <i className="navbar-toggle-icon fa-solid fa-xmark rotate"></i>)}
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
              Arå
            </Nav.Link> */}
            <Nav.Link as={Link} to="/login" className='header-link' onClick={handleLinkClick}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/newaccount" className='header-link' onClick={handleLinkClick}>
              New account
            </Nav.Link>
            <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/additem" className='header-link'onClick={handleLinkClick}>
              Lägg till
            </Nav.Link>
            <Nav.Link as={Link} to="/information" className='header-link'onClick={handleLinkClick} >
              Info
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" className='header-link' onClick={handleLinkClick}>
              Inställningar
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
