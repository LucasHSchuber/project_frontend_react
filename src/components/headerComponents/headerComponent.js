import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

//import css
import '../../assets/css/header.css';
// import logo from '../../assets/images/mountain2.png';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, AVATAR_ENDPOINT } from '../../api';





//header
function Header() {

  //define states
  const [expanded, setExpanded] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);




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
      try {
        const response = await axios.get(`${URL}/${USER_ENDPOINT}/${id}`);
        console.log(response.data);
        setUser(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);






  const handleLinkClick = () => {
    setExpanded(false);
  }

  return (
    <Navbar expanded={expanded} className={`header ${token ? 'loggedin' : ''}`} expand="lg">
      <Container>
        <Navbar.Brand>
          {token ? (
            <Nav.Link as={Link} to="/home" className='navbar-brand-link' >
              MindSpace
              {/* <img className="logo-img" src={logo} alt="logo img" ></img> */}
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
              <Nav.Link as={Link} to="/logout" className='header-link' onClick={handleLinkClick}>
                Logout
              </Nav.Link>

              <div className='dropdown'>
                <NavDropdown
                  title={
                    user.avatar ? (
                      <div className='header-avatar-image-box'>
                        <img className='header-avatar-image' src={`${URL}/imgupload/${user.avatar.avatarImageName}`} alt="Avatar" />
                        <i class="fa-solid fa-caret-down mx-2" style={{ color: "white" }}></i>
                      </div>
                    ) : null
                  }
                  id="collapse-nav-dropdown"
                  className='mx-md-4'
                >
                  {user.avatar ? (
                    <>
                      <NavDropdown.Item as={Link} to="/home">User</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/home">My lists</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/home">Favorites</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/home">Settings</NavDropdown.Item>
                    </>
                  ) : null}
                  <NavDropdown.Item as={Link} to="/logout" >Logout</NavDropdown.Item>
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
