import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

import { useAuth } from '../../assets/js/AuthContext';

//import css
import '../../assets/css/header.css';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, AVATAR_ENDPOINT } from '../../api';

//import images
import logo from '../../assets/images/pray.png';
import settingsImg from '../../assets/images/gear.png';
import favoritesImg from '../../assets/images/heart.png';
import mylistImg from '../../assets/images/list.png';
import userImg from '../../assets/images/user.png';



//header
function Header() {
  //define states
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState([]);
  const [isCaretRotated, setIsCaretRotated] = useState(false);
  const [screenSize, setScreenSize] = useState(true);


  const { isLoggedIn } = useAuth();



  //fetch and save user to hook
  useEffect(() => {
    //fetch user
    const fetchUser = async () => {
      let id = sessionStorage.getItem("userid");
      console.log(id);
      try {
        const response = await axios.get(`${URL}/${USER_ENDPOINT}/${id}`);
        // console.log(response.data);
        setUser(response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);


  //check screen size to show/hide avatar-dropdown in header
  useEffect(() => {
    const screenSize = () => {
      setScreenSize(window.innerWidth > 991)
      console.log(window.innerWidth);
    }
    window.addEventListener("resize", screenSize);
    screenSize();
  }, [])


  // const handleResize = () => {
  //   console.log('Window width:', window.innerWidth);
  // };

  // window.addEventListener('resize', handleResize);




  //rotate avatar arrow-down on click
  const handleCaretClick = () => {
    setIsCaretRotated(!isCaretRotated);
  }
  //expand dropwdown 
  const handleLinkClick = () => {
    setExpanded(false);
  }

  return (
    <Navbar expanded={expanded} className={`header ${isLoggedIn ? 'loggedin' : ''}`} expand="lg">
      <Container>
        <Navbar.Brand>
          {isLoggedIn ? ( //change direct if loggedin 
            <Nav.Link as={Link} to="/home" className='navbar-brand-link' >
              <img className="logo-img" src={logo} alt="logo img" ></img>
              MindSpace
            </Nav.Link>
          ) : ( //if not logged in 
            <Nav.Link as={Link} to="/" className='navbar-brand-link' >
              <img className="logo-img" src={logo} alt="logo img" ></img>
              MindSpace
            </Nav.Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          aria-controls="responsive-navbar-nav"
        >
          {(!expanded ? <i className="navbar-toggle-icon fa-solid fa-bars"></i> : <i className="navbar-toggle-icon fa-solid fa-xmark rotate"></i>)}
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">

          {isLoggedIn ? ( //show links in header if logged in

            <Nav className="nav-loggedin">

              <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/nature" className='header-link' onClick={handleLinkClick}>
                Nature
              </Nav.Link>
              <Nav.Link as={Link} to="/bodyscan" className='header-link' onClick={handleLinkClick}>
                Body scan
              </Nav.Link>
              <Nav.Link as={Link} to="/talkdown" className='header-link' onClick={handleLinkClick}>
                Talk down
              </Nav.Link>

              <div className='dropdown'>

                {screenSize ? (
                  <NavDropdown
                    title={
                      user.avatar ? (
                        <div className='header-avatar-image-box'>
                          <img className="header-avatar-image" src={`${URL}/imgupload/${user.avatar.avatarImageName}`} alt="Avatar" />
                          <i
                            className={`fa-solid fa-caret-down mx-2 ${isCaretRotated ? 'rotate' : ""}`}
                            style={{ color: "white" }}></i>
                        </div>
                      ) : null
                    }
                    id="collapse-nav-dropdown"
                    className='mx-md-4'
                    onClick={handleCaretClick}
                  >
                    {user.avatar ? (
                      <>
                        <NavDropdown.Item as={Link} to="/myaccount"><img src={userImg} alt="user img" className='dropdown-item-icon'></img>Your account</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/mylist"><img src={mylistImg} alt="mylist img" className='dropdown-item-icon'></img>My list</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/myfavorites"><img src={favoritesImg} alt="favorites img" className='dropdown-item-icon'></img>Favorites</NavDropdown.Item>
                        {/* <NavDropdown.Item as={Link} to="/home"><img src={settingsImg} alt="settings img" className='dropdown-item-icon'></img>Settings</NavDropdown.Item> */}
                        <hr className='hr-dropdown'></hr>
                      </>
                    ) : null}
                    <NavDropdown.Item as={Link} to="/logout">Logout from MindSpace</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <div>
                    <hr className='hr-dropdown' style={{ marginRight: '0.5em', width: '40%' }}></hr>
                    <Nav.Link as={Link} to="/myaccount" className='header-link' onClick={handleLinkClick}>
                      {user.avatar ? (
                        <img className="header-avatar-image" src={`${URL}/imgupload/${user.avatar.avatarImageName}`} alt="Avatar" />
                      ) : (null)}
                      &nbsp; Your account
                    </Nav.Link>
                    <Nav.Link as={Link} to="/mylist" className='header-link' onClick={handleLinkClick}>
                      My list
                    </Nav.Link>
                    <Nav.Link as={Link} to="/myfavorites" className='header-link' onClick={handleLinkClick}>
                      Favorites
                    </Nav.Link>
                    <hr className='hr-dropdown' style={{ marginRight: '0.5em', width: '40%' }}></hr>
                    <Nav.Link as={Link} to="/logout" className='header-link' onClick={handleLinkClick}>
                      Log out
                    </Nav.Link>
                  </div>
                )}
              </div>

            </Nav>

          ) : ( //show links in header if NOT logged in

            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login" className='header-link' onClick={handleLinkClick}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/newaccount" className='header-link' onClick={handleLinkClick}>
                New account
              </Nav.Link>
            </Nav>

          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
