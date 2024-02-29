import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logowithframe from '../assets/logowithframe.png';
import { Image } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Container className="header-container">
                
                <Row>
                    {/* Change logo-image */}
                    <Col className="d-none d-md-block" xs={3}> <Image src={logowithframe} fluid /> </Col>
                    {/* Change header-text */}
                    <Col className="d-none d-md-block headertext" xs={9}>Yrityksen nimi</Col>
                </Row>
            </Container>
        </>
    );
};

export default Header;