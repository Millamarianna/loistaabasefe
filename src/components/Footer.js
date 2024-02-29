import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <>
            <Container className="footer-container">

                <Row>
                    {/* Change footer-text */}
                    <Col className="footertext" xs={6}>© 2024 Loistaa Consulting</Col>
                    <Col className="footertext" xs={6}>admin@sähköposti.fi</Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;