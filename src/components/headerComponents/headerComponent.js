import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

//import css
import '../../assets/css/header.css';
import logo from '../../assets/images/pray.png';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, AVATAR_ENDPOINT } from '../../api';

//import images
import settingsImg from '../../assets/images/gear.png';
import favoritesImg from '../../assets/images/heart.png';
import mylistImg from '../../assets/images/list.png';
import userImg from '../../assets/images/user.png';



//header
function Header() {

  //define states
  const [expanded, setExpanded] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [isCaretRotated, setIsCaretRotated] = useState(false);




  //check if logged in
  const checkIfTokenExists = () => {
    let getToken = sessionStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }
  useEffect(() => {
    checkIfTokenExists();
  }, []);
  // Update token state whenever it changes
  useEffect(() => {
    checkIfTokenExists();
  }, [token]);




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



  const handleCaretClick = () => {
    setIsCaretRotated(!isCaretRotated);
  }


  const handleLinkClick = () => {
    setExpanded(false);
  }

  return (
    <Navbar expanded={expanded} className={`header ${token ? 'loggedin' : ''}`} expand="lg">
      <Container>
        <Navbar.Brand>
          {token ? (
            <Nav.Link as={Link} to="/home" className='navbar-brand-link' >
              <img className="logo-img" src={logo} alt="logo img" ></img>
              MindSpace
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/index" className='navbar-brand-link' >
              MindSpace
              {/* <img className="logo-img" src={logo} alt="logo img" ></img> */}
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

          {token ? (

            <Nav className="nav-loggedin">

              <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
                Nature
              </Nav.Link>
              <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
                Body scan
              </Nav.Link>
              <Nav.Link as={Link} to="/home" className='header-link' onClick={handleLinkClick}>
                Relaxation
              </Nav.Link>

              <div className='dropdown'>
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
                      <NavDropdown.Item as={Link} to="/home"><img src={favoritesImg} alt="favorites img" className='dropdown-item-icon'></img>Favorites</NavDropdown.Item>
                      {/* <NavDropdown.Item as={Link} to="/home"><img src={settingsImg} alt="settings img" className='dropdown-item-icon'></img>Settings</NavDropdown.Item> */}
                      <hr className='hr'></hr>
                    </>
                  ) : null}
                  <NavDropdown.Item as={Link} to="/logout">Logout from MindSpace</NavDropdown.Item>
                </NavDropdown>
              </div>

            </Nav>


          ) : (

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
