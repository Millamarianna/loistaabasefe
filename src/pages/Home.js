import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { FaArrowRightLong } from "react-icons/fa6";

import Map from '../components/Map';
import Social from '../components/Social';
import terapiaterttu from '../assets/terttu.jpeg';

//To use edit:

import useAuth from "../hooks/useAuth";

const Home = (props) => {
  let navigate = useNavigate();
  const lay = props.lay;
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
  const [texts, setTexts] = useState([]);
  const [textToEdit, setTextToEdit] = useState({
    "_id": "",
    "page": "home",
    "header": "",
    "body": [""],
    "type": "",
    "date": "",
    "time": "",
    "duration": "",
    "show": ""
  });
  const [fetchAgain, setFetchAgain] = useState(0);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  // Tekstien editointiin liittyvät funktiot ja muuttujat

  useEffect(() => {
    const getTexts = async () => {
      const response = await fetch("https://fam-backend-base.azurewebsites.net/text/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let textData = await response.json();
        setTexts(textData);
        setLoading(false);
      }
      else {
        console.log("getTexts, response not ok");
      }
    };
    getTexts();
  }, [fetchAgain])

  const handleEditText = async () => {
    let id = textToEdit._id;
    const response = await fetch(`https://fam-backend-base.azurewebsites.net/text/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textToEdit),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("onnistui");
      setShow(false);
      setTextToEdit({ "_id": "", "page": "home", "header": "", "body": [""], "type": "", "date": "", "time": "", "duration": "", "show": "" });
      setFetchAgain(fetchAgain + 1);
    } else {
      let errorResponse = await response.json();
      console.log("ei onnistunut:" + errorResponse["detail"]);
    }
  };

  const edit = (e) => {
    let editable = texts.find(x => x._id === e.target.id);
    setTextToEdit(editable)
    setShow(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, [name]: value });
  };

  const handleBodyInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body.slice(0, name), value, ...textToEdit.body.slice(parseInt(name) + 1)] });

  };

  const add = () => {
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body, ""] });
  }

  const del = (e) => {
    let newBody = textToEdit.body.filter((item, index) => index != e.target.id);
    setTextToEdit({ ...textToEdit, body: newBody });
  }

  const handleClose = () => setShow(false);

  // Layoutin muuttaminen

  const next = () => {
    if (lay == 1) {
      navigate("/vaihtoehto2", { replace: true });
    }
    else {
      navigate("/", { replace: true });
    }
  }

  //info-popup
  const [showA, setShowA] = useState(false);
  const info = () => {
    setShowA(!showA);
  }

  return (
    <><Container className="container-fluid" style={{ marginTop: '3vh' }}>
      {loading ? (<Spinner animation="border" variant="success" />) :
        (<>
          <Row style={{ padding: '0.5vh' }}>
            <Col lg={12} xl={6}>
              <b>{texts.find(x => x._id === "657c43a2ea1d95a5fc6c4092").header}</b>
              
            </Col>
            <Col lg={12} xl={2}>
              <Button onClick={next} className={lay == 1 ? "home1-button" : "home-button"}>{<FaArrowRightLong />} Kysy lisää!</Button>
            </Col>
          </Row>
          <Row style={{ padding: '0.5vh' }}>
            <Col lg={12} xl={8}>
              {texts.find(x => x._id === "657c43a2ea1d95a5fc6c4092").body.map((data) => {
                return (
                  <p id={data.toString()}>
                    {data}
                  </p>
                )
              })}
              {isLoggedIn && auth.role == "admin" ?
                (<Button id="657c43a2ea1d95a5fc6c4092" variant="danger" onClick={(e) => edit(e)}>
                  Muokkaa
                </Button>)
                : (<Button onClick={next} className="home-button">{<FaArrowRightLong />} Vaihda näkymä</Button>)}
            </Col>

            <Col lg={12} xl={4}>
              <Image src={terapiaterttu} fluid roundedCircle thumbnail />
            </Col>
          </Row>
          <Row style={{ padding: '0.5vh' }}>
            <Col md style={{ border: '1px solid #F7EDDB' }}>
              <p><b>{texts.find(x => x._id === "65f2af3f8f73ec7863ff5be0").header}</b></p>
              {texts.find(x => x._id === "65f2af3f8f73ec7863ff5be0").body.map((data) => {
                return (
                  <p id={data.toString()}>
                    {data}
                  </p>
                )
              })}
              {isLoggedIn && auth.role == "admin" ?
                (<Button id="65f2af3f8f73ec7863ff5be0" variant="danger" onClick={(e) => edit(e)}>
                  Muokkaa
                </Button>)
                : null}
            </Col>
            <Col md>Tähän omaa sisältöäsi!
            </Col>
            <Col md><Social lay={lay} /> </Col>
          </Row>

          <Row style={{ padding: '0.5vh' }}>
            <Map />
          </Row>
        </>
        )}
    </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Muokkaa tekstiä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Otsikko</Form.Label>
              <Form.Control type="text" placeholder={textToEdit.header} name="header" value={textToEdit.header} onChange={handleInputChange} />
            </Form.Group>

            {textToEdit.body.map((data, index) => {
              return (
                <Form.Group className="mb-3" id={index.toString()}>
                  <Form.Label>Tekstikappale {index + 1} &nbsp;&nbsp;&nbsp;&nbsp;</Form.Label><Button variant="secondary" id={index} onClick={(e) => del(e)}> Poista</Button>
                  <Form.Control as="textarea" placeholder={textToEdit.body[index]} name={index} value={textToEdit.body[index]} onChange={handleBodyInputChange} />
                </Form.Group>
              )
            })}
            <Button variant="secondary" onClick={add}>Lisää tekstikappale</Button>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            PERUUTA
          </Button>
          <Button variant="primary" onClick={handleEditText}>
            PÄIVITÄ TIEDOT
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );

}

export default Home;