import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer_ocean = () => {
    return (
        <>
            <Container className="o-footer-container">

                <Row>
                    {/* Change footer-text */}
                    <Col className="o-footertext" xs={6}>© 2024 Loistaa Consulting</Col>
                    <Col className="o-footertext" xs={6}>info@sähköposti.fi</Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer_ocean;