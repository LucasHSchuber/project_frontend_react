import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

//import css
import '../../assets/css/header.css';
// import logo from '../../assets/images/mountain2.png';

// Importing api url and enpoints
// import { BASE_URL, BASE_URL2, ITEM_ENDPOINT, CATEGORY_ENDPOINT, INFORMATION_ENDPOINT, UNIT_ENDPOINT } from '../../api';

//import css
import '../../assets/css/footer.css';



//start apge
function Footer() {


    return (
        <div className='footer-wrapper' id="footer-wrapper" >

            <Navbar className='footer' expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link as={Link} to="/index" className='footer-brand-link' >
                            Space
                            {/* <img className="logo-img" src={logo} alt="logo img" ></img> */}
                        </Nav.Link>
                    </Navbar.Brand>

                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/login" className='footer-link' >
                            Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/newaccount" className='footer-link'>
                            New account
                        </Nav.Link>
                    </Nav>

                </Container>
            </Navbar>

        </div>
    );


}

export default Footer;
