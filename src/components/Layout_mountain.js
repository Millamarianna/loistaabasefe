import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Header_forest from './Header_forest';
import Footer_forest from "./Footer_forest";

//Import the logo in different sizes
import logo from '../assets/logolehti.png';
import banner from '../assets/taustabanneri.jpeg';
import logo100 from '../assets/logo100.png';
import logo200 from '../assets/logo200.png';
import logo300 from '../assets/logo300.png';

//Import useAuth hook
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
//import { BiSolidLock } from "react-icons/bi";
//import { BiSolidLockOpen } from "react-icons/bi";

const Layout_mountain = () => {

  const [expanded, setExpanded] = useState(false);

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
    <>
      <Container fluid className="layout-m-container">

        <Row>
          {/* Change logo-image */}
          <Col xs={3} style={{textAlign: 'right'}}> <Image src={logo} fluid style={{ maxHeight: '50px' }} /> </Col>
          {/* Change header-text */}
          <Col className="m-headertext" xs={4}>Yrityksesi nimi ja logo</Col>
          <Col xs={5}>
            <Navbar collapseOnSelect expand="md">
              <Container className="m-navigator-container">

                <Navbar.Toggle onClick={() => setExpanded(!expanded)} style={{ borderRadius: '.2rem', boxShadow: 'none' }} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    {/* Check correct link paths with router in App */}
                    <Nav.Link as={Link} to="/">Linkki</Nav.Link>
                    <Nav.Link as={Link} to="/">Linkki</Nav.Link>
                    <NavDropdown title="Linkkivalikko" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/">Linkki</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">Linkki</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/">Linkki</NavDropdown.Item>
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
          </Col>

        </Row>
        <Row>
        <Col style={{ position: 'relative', maxHeight: '350px', overflow: 'hidden' }}>
        <Image
          src={banner}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          fluid
        />
         <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          color: 'white',
        }}><h3 style={{fontSize: '40px', color: 'white'}}>Tähän verkkosivujesi keskeinen sanoma.</h3></div> 
        {/* <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '50%', 
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          color: 'black',
        }}>
          <h3>Tähän verkkosivujesi keskeinen sanoma.</h3>
          <Button className="m-button">Ota yhteyttä</Button>
        </div>
        <div style={{ width: '5%', height: '5%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '2%', right: '2%' }}></div>
        <div style={{ width: '7%', height: '7%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '6%', right: '8%' }}></div>
        <div style={{ width: '9%', height: '9%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '12%', right: '16%' }}></div>
           */}
      </Col>
{/* <Col style={{ position: 'relative', maxHeight: '350px', overflow: 'hidden' }}>
        <Image
          src={banner}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          fluid
        />
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust transparency here
          color: 'white',
        }}>
          
          <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255, 0, 0, 0.5)', position: 'absolute', top: '20px', left: '20px' }}></div>
          <div style={{ width: '70px', height: '70px', backgroundColor: 'rgba(0, 255, 0, 0.5)', position: 'absolute', top: '60px', left: '100px' }}></div>
          <div style={{ width: '90px', height: '90px', backgroundColor: 'rgba(0, 0, 255, 0.5)', position: 'absolute', top: '120px', left: '180px' }}></div>
          
          
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '50%', 
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
          }}>
            <h2>This is the overlay text</h2>
            <p>This is line 1 of the text</p>
            <p>This is line 2 of the text</p>
            <p>This is line 3 of the text</p>
            <button>Button</button>
          </div>
        </div>
      </Col> */}

        </Row>
      </Container>


      <Outlet />
      <Footer_forest />
    </>
  );
};


export default Layout_mountain;