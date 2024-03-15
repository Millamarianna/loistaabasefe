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
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { IoCopyOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiSquareQuestion } from "react-icons/ci";

import Map from '../components/Map';
import Social from '../components/Social';
import terapiaterttu from '../assets/terttu.jpeg';
import useWindowSize from "../hooks/useWindowSize";

import useAuth from "../hooks/useAuth";

const Home = (props) => {
  //window size
  const size = useWindowSize();
  
  //env variables
  const service_id = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const public_key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const database = process.env.REACT_APP_DB;

  //navigate to another page
  let navigate = useNavigate();
  //show which layout is used
  const lay = props.lay;
  //useAuth hook provides auth state and functions to update it
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
  //set texts to state
  const [texts, setTexts] = useState([]);
  //set text to edit to state
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
  //if texts are not loaded, fetch again
  const [fetchAgain, setFetchAgain] = useState(0);
  //loading spinner if texts are not loaded
  const [loading, setLoading] = useState(true);
  //textedit-modal show/hide
  const [show, setShow] = useState(false);

  //fetch texts from database
  useEffect(() => {
    const getTexts = async () => {
      const response = await fetch(`${database}/text`, {
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

  //edit text by sending out request to database when "PÄIVITÄ" button is clicked
  const handleEditText = async () => {
    let id = textToEdit._id;
    const response = await fetch(`${database}/text/${id}`, {
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
//when "Muokkaa" button is clicked, set the spesific text to edit (from database) to state and show modal
  const edit = (e) => {
    let editable = texts.find(x => x._id === e.target.id);
    setTextToEdit(editable)
    setShow(true);
  }
//handle header input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, [name]: value });
  };
//handle body input change in modal (text body is an array of strings, so we need to use slice to change the spesific string in array)
  const handleBodyInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body.slice(0, name), value, ...textToEdit.body.slice(parseInt(name) + 1)] });
  };
//add new text string to body-array in modal 
  const add = () => {
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body, ""] });
  }
//delete a specific text string from body-array in modal
  const del = (e) => {
    let newBody = textToEdit.body.filter((item, index) => index != e.target.id);
    setTextToEdit({ ...textToEdit, body: newBody });
  }
//close modal
  const handleClose = () => setShow(false);

  //navigate to another page
  const next = () => {
    if (lay == 1) {
      navigate("/vaihtoehto2", { replace: true });
    }
    else {
      navigate("/", { replace: true });
    }
  }

  const open = () => {
    setShow2(true);
}
//send email
  const [show2, setShow2] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [showEmailNotSent, setShowEmailNotSent] = useState(false);
  const [formText, setFormText] = useState({});
  const [showCopy, setShowCopy] = useState(false);

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
    <><Container fluid style={{ marginTop: '3vh' }}>
      {loading ? (<Spinner animation="border" variant="success" />) :
        (<>
          <Row style={{ padding: '0.5vh' }}>
            <Col lg={12} xl={6}>
              <b>{texts.find(x => x._id === "657c43a2ea1d95a5fc6c4092").header}</b>
              
            </Col>
            <Col lg={12} xl={2}>
              <Button onClick={open} className={lay == 1 ? "home1-button" : "home-button"}>{<FaArrowRightLong />} Kysy lisää!</Button>
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
                : (<Button onClick={next} className={lay == 1 ? "home1-button" : "home-button"}>{<FaArrowRightLong />} Vaihda näkymä</Button>)}
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

    </>
  );

}

export default Home;