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
import Toast from 'react-bootstrap/Toast';

import logo from '../assets/treelogo2.png';

import useAuth from "../hooks/useAuth";
import useWindowSize from "../hooks/useWindowSize";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";
import { CiSquareQuestion } from "react-icons/ci";


const Layout_ocean = () => {

    //env variables
    const service_id = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const public_key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const [expanded, setExpanded] = useState(false);
    const [show, setShow] = useState(false);
    const [lay, setLay] = useState(2);
    const size = useWindowSize();
    const width = size.width;
    const height = size.height;



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

    //send email
  const [show2, setShow2] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [showEmailNotSent, setShowEmailNotSent] = useState(false);
  const [formText, setFormText] = useState({});
  const [showCopy, setShowCopy] = useState(false);

  //open email modal
  const open = () => {
    setShow2(true);
  }
  const handleClose2 = () => setShow2(false);
  const sendEmail = (e) => {
    e.preventDefault();

    const data = {
      service_id: service_id,
      template_id: template_id,
      user_id: public_key,
      template_params: {
        'first_name': formText.first_name,
        'last_name': formText.last_name,
        'email': formText.email,
        'company': formText.company,
        'message': formText.message,
        'service0': formText.service0,
        'service1': formText.service1,
        'service2': formText.service2,
        'service3': formText.service3,
        'service4': formText.service4,
        'service5': formText.service5,
        'service6': formText.service6,
        'service7': formText.service7,
        'service_else': formText.service_else,
      }
    };

    const sendRequest = async () => {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShow2(false);
        setShowEmailSent(true);
        setFormText({});
      } else {
        console.log("Email not sent");
        setShowEmailNotSent(true);
      }
    }
    sendRequest();
  }

  const formStyle = {
    textAlign: 'left',
    fontSize: '1em',
    fontWeight: '700',
    color: '#000000',
  };
  const saveTyped = (e) => {
    if (e.target.type === "checkbox") {
      setFormText({ ...formText, [e.target.name]: e.target.checked });
    } else {
      setFormText({ ...formText, [e.target.name]: e.target.value });

    }
    console.log(formText);
  }
  const services = {
    "label": ["Sisällöntuotanto", "Graafinen suunnittelu", "Palvelintila", "Uusi domain", "Ylläpito", "Tietokanta", "Käyttäjävarmennus", "Käyttöliittymä tekstimuokkauksille"],
    "description": ["Ideastasi konkreettiseksi tekstiksi verkkosivuillesi.", "Visuaalinen ilme ja grafiikat verkkosivuillesi.", "Pilvessä sijaitseva tallennustila verkkosivuille.", "Sivustosi osoite, joka kirjoitetaan nettiselaimen osoitekenttään.", "Tarvittavat päivitykset esimerkiksi kuukausimaksulla tai päivityskohtaisella kustannuksilla.", "Mahdollisuus tallentaa pysyvästi tietoja, esimerkiksi lomaketietoja.", "Mahdollisuus rekisteröityä käyttäjäksi ja kirjautua sisään päästäkseen käsiksi joihinkin sisältöihin.", "Mahdollisuus kirjautua muokkaamaan tekstejä helposti itse."]
  };
  const tooltipPlace = size.width < 450 ? "top" : "right";



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
                                                {/* <NavDropdown.Divider />
                                                <NavDropdown.Item as={Link} to="/user">Käyttäjätiedot</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/appt">Ajanvaraukset</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/createappt">Varaa uusi aika</NavDropdown.Item> */}
                                            </NavDropdown>
                                        ) : (
                                            <NavDropdown title={<BiSolidLock />} id="collapsible-nav-dropdown">
                                                <NavDropdown.Item as={Link} to="/vaihtoehto2/login">Kirjaudu</NavDropdown.Item>
                                                {/* <NavDropdown.Item as={Link} to="/vaihtoehto2/register">Rekisteröidy</NavDropdown.Item> */}
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

            {/* <Modal show={show} onHide={handleClose}>
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
            </Modal> */}

            <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Kotisivu-paketti</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={sendEmail}>
            <Row id="names" className="mb-1 g-1">

              <Form.Text style={formStyle} onClick={async () => {
                if ("clipboard" in navigator) {
                  await navigator.clipboard.writeText("web@loistaa.fi");
                } else {
                  document.execCommand("copy", true, "web@loistaa.fi");
                }
                setShowCopy(true);
              }}>
                Pyydä tarjousta sähköpostilla web@loistaa.fi <sup>{<IoCopyOutline size={10} />}</sup> tai täytä tarjouslomake:
              </Form.Text>
              <div className="typewriter"
                style={{ zIndex: '100', position: 'absolute', top: '5%', right: '2%', maxWidth: '50%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}>
                <Toast onClose={() => setShowCopy(false)} show={showCopy} delay={2000} autohide>
                  Kopioitu leikepöydälle!
                </Toast>
              </div>
              <div className="typewriter"
                style={{ position: 'absolute', zIndex: '100', bottom: '10%', left: '2%', maxWidth: '75%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}>
                <Toast onClose={() => setShowEmailNotSent(false)} show={showEmailNotSent} delay={6000} autohide>
                  <p>Virhe lomakkeen lähetyksessä. Voit kopioida kentät ja lähettää ne meille sähköpostilla!</p>Pahoittelut vaivasta, korjaamme vian mahdollisimman pian!
                </Toast>
              </div>

              <Form.Text muted>Yleiset tiedot</Form.Text>

              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingFirstName" label="Etunimi" className="mb-0 g-0">
                  <Form.Control autocomplete="on" aria-label="Etunimi" type="name" placeholder="Etunimi" name="first_name" value={formText.first_name} onChange={saveTyped} />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingLastName" label="Sukunimi" className="mb-0 g-0">
                  <Form.Control autocomplete="on" aria-label="Sukunimi" type="name" placeholder="Sukunimi" name="last_name" value={formText.last_name} onChange={saveTyped} />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Form.Group className="mb-1 g-1">
              <FloatingLabel controlId="floatingEmail" label="Sähköposti" className="mb-0 g-0">
                <Form.Control autocomplete="on" aria-label="Sähköposti" type="email" placeholder="Sähköposti" name="email" value={formText.email} onChange={saveTyped} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-1 g-1">
              <FloatingLabel controlId="floatingCompany" label="Yrityksen nimi" className="mb-0 g-0">
                <Form.Control autocomplete="on" aria-label="Yrityksen nimi" placeholder="Yrityksen nimi" name="company" value={formText.company} onChange={saveTyped} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-1 g-1">
              <FloatingLabel controlId="floatingMessage" label="Viesti" className="mb-1 g-1">
                <Form.Control aria-label="Viesti" as="textarea" rows={4} name="site_description" value={formText.message} onChange={saveTyped} placeholder="Viesti" />
              </FloatingLabel>
            </Form.Group>

            <hr />

            <Row className="mb-1 g-1">
              <Form.Text muted>Tarvitsemasi palvelut</Form.Text>
            </Row>

            {services.label.map((label, index) => {
              const description = services.description[index];

              return (
                <Row id={index} className="mb-0 g-0">
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      id={`s${index}`}
                      label={label}
                      name={`service${index}`}
                      onChange={saveTyped}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <OverlayTrigger
                      key={`info${index}`}
                      placement={tooltipPlace}
                      overlay={<Tooltip id={index}>{description}</Tooltip>}>
                      <Form.Text muted>{<CiSquareQuestion size={26} />}</Form.Text>
                    </OverlayTrigger>
                  </Form.Group>
                </Row>)
            })}
            <Form.Group className="mb-1 g-1">

              <Form.Control aria-label="Muuta" as="textarea" rows={3} placeholder="Muuta" name="service_else" value={formText.service_else} onChange={saveTyped} />

            </Form.Group>

            <Button className={lay == 1 ? "home1-button" : "home-button"} type="submit" >
              LÄHETÄ
            </Button>

          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>


            <Outlet />
            <Container className="o-footer-container">

                <Row>
                    {/* Change footer-text */}
                    <Col className="o-footertext" xs={6}>© 2024 <Link to="https://loistaa.fi">Loistaa Consulting</Link></Col>
                    <Col className="o-footertext" xs={6}>info@sähköposti.fi</Col>
                </Row>
            </Container>
        </Container>
    );
};


export default Layout_ocean;