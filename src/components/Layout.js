import { Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Header from './Header';
import Footer from "./Footer";

//Import the logo in different sizes
import logo100 from '../assets/logo100.png';
import logo200 from '../assets/logo200.png';
import logo300 from '../assets/logo300.png';

//Import useAuth hook
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
//import { BiSolidLock } from "react-icons/bi";
//import { BiSolidLockOpen } from "react-icons/bi";

const Layout = () => {

    //useAuth hook provides auth state and functions to update it
   const { isLoggedIn, setLoggedIn, setAuth } = useAuth();
 
   //Check if user is logged in by checking the cookie
   useEffect(() => {
     // Check if the JWT token exists in the cookie
     const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
     if (jwtCookie && jwtCookie.split("=")[1] !== undefined && jwtCookie.split("=")[1] !== "") {
       setLoggedIn(true);
     } else {
       setLoggedIn(false);
     }
   }, [isLoggedIn]);
 
   //Logout function
   const logout = () => {
     // Perform logout actions
     console.log('Before deleting cookie:', document.cookie);
     document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     console.log('After setting cookie:', document.cookie);
 
     // Update login state to trigger re-render
     setLoggedIn(false);
     setAuth({});
   };

    return (
        <Container className="layout-container" fluid>
            <Header />
            <Navbar collapseOnSelect expand="md">
                <Container className="navigator-container">
                    {/* Change the link and the logo images */}
                    <Navbar.Brand className="d-md-none" href="#">
                        <img
                            srcSet={`${logo100} 100w, ${logo200} 200w, ${logo300} 300w`}
                            sizes="(max-width: 400px) 100px, (max-width: 700px) 200px, 300px"
                            src={logo300}
                            alt="Yrityksen logo"
                        /> Yrityksen nimi?
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* Check correct link paths with router in App */}
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/dropdown1">Dropdown1</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/dropdown2">Dropdown2</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/dropdown3">Dropdown3</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* Admin paths, check with router in App */}
                        {/* {isLoggedIn && auth.role == "admin" ? (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/terttu/customers">Asiakkaat</Nav.Link>
                <Nav.Link as={Link} to="/terttu/appointments">Ajanvaraukset</Nav.Link>
                <Nav.Link as={Link} to="/terttu/createappointments">Tee uusi ajanvaraus</Nav.Link>
              </Nav>
            ) : null}*/}

                        {/* Log-in paths, check with router in App */}
                        {/*  <Nav className="ms-auto">
              {isLoggedIn && auth.first_name ? (
                <Navbar.Text>
                  Hei {auth.first_name}!
                </Navbar.Text>) : null}
              {isLoggedIn && auth.first_name ? (
                <NavDropdown align="end" title={<BiSolidLockOpen />} id="collapsible-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Kirjaudu ulos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/user">Käyttäjätiedot</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/appt">Ajanvaraukset</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createappt">Varaa uusi aika</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown align="end" title={<BiSolidLock />} id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login">Kirjaudu sisään</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Rekisteröidy käyttäjäksi</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav> */}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
            <Footer />
        </Container>
    );
};


export default Layout;