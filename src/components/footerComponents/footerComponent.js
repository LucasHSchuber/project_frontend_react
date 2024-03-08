import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import { useAuth } from '../../assets/js/AuthContext';

//import css
import '../../assets/css/footer.css';
//import images
import logo from '../../assets/images/pray.png';








function Footer() {


    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);



    return (
        <footer className="footer">
            <Container>
                <Navbar.Brand className='mb-3'>
                    {isLoggedIn ? (
                        <Link to="/" className='footer-brand-link'>
                            <img className="logo-img" src={logo} alt="logo img" ></img>
                            MindSpace
                        </Link>
                    ) : (
                        <Link to="/" className='footer-brand-link'>
                            <img className="logo-img" src={logo} alt="logo img" ></img>
                            MindSpace
                        </Link>
                    )}
                </Navbar.Brand>
                <Nav className="d-flex justify-content-center">
                    {isLoggedIn ? (
                        <div>
                            <Link to="/home" className='footer-link'>Home</Link>
                            <Link to="/nature" className='footer-link'>Nature</Link>
                            <Link to="/bodyscan" className='footer-link'>Body Scan</Link>
                            <Link to="/talkdown" className='footer-link'>Talk down</Link>
                            <Link to="/guided" className='footer-link'>Guided</Link>
                            <Link to="/myaccount" className='footer-link'>Your Account</Link>
                            <Link to="/mylist" className='footer-link'>My List</Link>
                            <Link to="/myfavorites" className='footer-link'>Favorites</Link>
                            <Link to="/logout" className='footer-link'>Logout</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/" className='footer-link'>Home</Link>
                            <Link to="/login" className='footer-link'>Login</Link>
                            <Link to="/newaccount" className='footer-link'>New account</Link>
                        </div>
                    )}
                </Nav>

                <Nav className="social-icons d-flex justify-content-center my-4">
                    <Nav.Link href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook"></i>
                    </Nav.Link>
                    <Nav.Link href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter"></i>
                    </Nav.Link>
                    <Nav.Link href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                    </Nav.Link>
                    <Nav.Link href="https://www.linkedin.com/" target="_blank">
                        <i className="fab fa-linkedin"></i>
                    </Nav.Link>
                </Nav>
            </Container>
        </footer>
    );
}

export default Footer;
