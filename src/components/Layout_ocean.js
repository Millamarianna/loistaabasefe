import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import logo from '../assets/treelogo2.png';

import useAuth from "../hooks/useAuth";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";


const Layout_ocean = () => {
    const [expanded, setExpanded] = useState(false);
    const [show, setShow] = useState(false);

    const open = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    //useAuth hook provides auth state and functions to update it
    const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();

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

    const doNothing = (e) => {
        e.preventDefault();
        setShow(false);}

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Tämä lomake on malli eikä ole toiminnassa!
        </Tooltip>
      );


    return (
        <Container className="layout-container" fluid>
            
            <Container className="header-o-container">
                <Row className="align-items-center">
                    <Col>
                        <Navbar expanded={expanded} collapseOnSelect expand="lg">
                            <Container className="navigator-container">
                                <Navbar.Toggle onClick={() => setExpanded(!expanded)} style={{ borderRadius: '.2rem', boxShadow: 'none' }} className="mr-auto border-0" aria-controls="responsive-navbar-nav">{expanded ? (<RxCross1 />) : (<RxHamburgerMenu />)}</Navbar.Toggle>
                                <Navbar.Collapse >
                                    <Nav className="me-auto o-linktext" style={{ width: '10px' }}>
                                        {/* Check correct link paths with router in App */}
                                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="">Linkki</Nav.Link>
                                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="">Linkki</Nav.Link>
                                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="">Linkki</Nav.Link>
                                        {/* Admin paths, check with router in App */}
                                        {/* {isLoggedIn && auth.role == "admin" ? (<>

                                            <Nav.Link as={Link} to="/terttu/customers">Asiakkaat</Nav.Link>
                                            <Nav.Link as={Link} to="/terttu/appointments">Ajanvaraukset</Nav.Link>
                                            <Nav.Link as={Link} to="/terttu/createappointments">Tee uusi ajanvaraus</Nav.Link>
                                        </>
                                        ) : null} */}
                                        {/* Log-in paths, check with router in App */}

                                        {/* {isLoggedIn && auth.first_name ? (
                                            <Navbar.Text>
                                                Hei {auth.first_name}!
                                            </Navbar.Text>) : null} */}
                                        {isLoggedIn && auth.first_name ? (
                                            <NavDropdown title={<BiSolidLockOpen />} id="collapsible-nav-dropdown">
                                                <NavDropdown.Item onClick={logout}>Kirjaudu ulos</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item as={Link} to="/user">Käyttäjätiedot</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/appt">Ajanvaraukset</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/createappt">Varaa uusi aika</NavDropdown.Item>
                                            </NavDropdown>
                                        ) : (
                                            <NavDropdown title={<BiSolidLock />} id="collapsible-nav-dropdown">
                                                <NavDropdown.Item as={Link} to="/vaihtoehto2/login">Kirjaudu</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/vaihtoehto2/register">Rekisteröidy</NavDropdown.Item>
                                            </NavDropdown>
                                        )}
                                    </Nav>






                                </Navbar.Collapse>

                            </Container>
                        </Navbar>
                    </Col>
                    <Col className="o-headertext"><Image src={logo} fluid style={{ maxHeight: '50px' }} /> Yrityksesi nimi</Col>
                    <Col className="o-headertext d-none d-lg-block"><Button onClick={open} className="o-headerbutton">Ota yhteyttä!</Button></Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yhteydenottolomake</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={doNothing}>
                        <Row id="names" className="mb-1 g-1">

                            <Form.Text>
                                Lomaketta voi muokata tarpeisiisi sopivaksi. Lomakkeita voi käyttää myös mm. asiakaspalautteisiin, kyselyihin tai tilauksiin. Lomakkeen tiedot voidaan lähettää sähköpostiin tai tallentaa tietokantaan.
                            </Form.Text>

                            <Form.Group as={Col}>
                                <FloatingLabel controlId="floatingFirstName" label="Etunimi" className="mb-0 g-0">
                                    <Form.Control autocomplete="on" aria-label="Etunimi" type="name" placeholder="Etunimi" name="first_name" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <FloatingLabel controlId="floatingLastName" label="Sukunimi" className="mb-0 g-0">
                                    <Form.Control autocomplete="on" aria-label="Sukunimi" type="name" placeholder="Sukunimi" name="last_name" />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingEmail" label="Sähköposti" className="mb-0 g-0">
                                <Form.Control autocomplete="on" aria-label="Sähköposti" type="email" placeholder="Sähköposti" name="email" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingCompany" label="Osoite" className="mb-0 g-0">
                                <Form.Control autocomplete="on" aria-label="Osoite" placeholder="Osoite" name="address" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingSiteDescription" label="Vapaan tekstin kenttä" className="mb-1 g-1">
                                <Form.Control aria-label="Vapaan tekstin kenttä" as="textarea" rows={4} name="site_description" placeholder="Vapaan tekstin kenttä" />
                            </FloatingLabel>
                        </Form.Group>

                        <hr />

                        <Row className="mb-1 g-1">
                            <Form.Text muted>Tarvittavia valintoja</Form.Text>
                        </Row>

                        <Row className="mb-0 g-0">
                            <Form.Group as={Col}>
                                <Form.Check
                                    type="checkbox"
                                    id="c1"
                                    label="Vaihtoehto 1"
                                    name="service1"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-0 g-0">
                            <Form.Group as={Col}>
                                <Form.Check
                                    type="checkbox"
                                    id="c2"
                                    label="Vaihtoehto 2"
                                    name="service2"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-1 g-1">

                            <Form.Control aria-label="Muuta" as="textarea" rows={3} placeholder="Muuta" name="service_else" />

                        </Form.Group>
                        <hr />
                        <Form.Text>
                            Tämä lomake on malli, eikä ole toiminnassa! Ota yhteyttä sähköpostitse web@loistaa.fi tai osoitteessa loistaa.fi.
                        </Form.Text>
                        <hr />
                        
                        <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button type="submit">LÄHETÄ</Button>
    </OverlayTrigger>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        
            
            <Outlet />
            <Container className="o-footer-container">

                <Row>
                    {/* Change footer-text */}
                    <Col className="o-footertext" xs={6}>© 2024 Loistaa Consulting</Col>
                    <Col className="o-footertext" xs={6}>info@sähköposti.fi</Col>
                </Row>
            </Container>
        </Container>
    );
};


export default Layout_ocean;