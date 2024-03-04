import Container from 'react-bootstrap/Container';
import Map from '../components/Map';
import Social from '../components/Social';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Image } from "react-bootstrap";

//To use edit:
import { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";

const Home = () => {
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

  console.log(isLoggedIn);

    return (
        <>
        {loading ? (<div>loading...</div>) :
        (<Container className="container-fluid" style={{ marginTop: '3vh' }}>
          <Row style={{padding: '0.5vh'}}>
          <Col sm={8}>
              <b>{texts.find(x => x._id === "657c43a2ea1d95a5fc6c4092").header}</b>
            </Col>
            <Col sm={4}>
            
            </Col>
          </Row>
          <Row style={{padding: '0.5vh'}}>
            <Col sm={8}>
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
                : null}
            </Col>

            <Col sm={4}>
              
            </Col>
          </Row>
          <Row style={{padding: '0.5vh'}}>
            <Col sm>Etiam non dui nulla. Nullam at tempor urna. Praesent sed eros metus. Quisque semper, leo eu pretium ullamcorper, augue lectus sodales sem, eu tristique metus justo a turpis. Phasellus egestas mi vitae nunc eleifend, quis mattis dui vehicula. Phasellus a lorem gravida, sollicitudin purus venenatis, cursus arcu. Nullam in euismod nibh. Sed tristique dolor arcu, eget cursus nisi tincidunt sed. Nulla posuere massa in lectus mollis, ut egestas est aliquam. Vestibulum bibendum, mi ut mattis condimentum, augue leo eleifend enim, non dictum nisl erat a risus. Suspendisse auctor, lectus ac semper vestibulum, eros orci commodo nulla, ut porta magna metus ut dolor. Maecenas pharetra turpis vitae nibh commodo, luctus porttitor magna rhoncus. Phasellus hendrerit sagittis erat, a congue magna imperdiet at. Sed congue rutrum malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed cursus, nunc at gravida dignissim, tortor arcu pellentesque ipsum, non semper augue orci quis lorem. </Col>
            <Col sm>Mauris elementum ligula velit, et luctus mauris lobortis et. Integer leo metus, molestie non consequat et, rutrum quis massa. Aliquam semper nulla mi, id eleifend ante consequat quis. Vestibulum varius hendrerit massa et maximus. In laoreet accumsan condimentum. Duis libero lorem, ultricies commodo pharetra vitae, malesuada non elit. Donec iaculis, nisl nec condimentum suscipit, elit mauris imperdiet lacus, vitae sollicitudin purus urna vitae ipsum. Duis et luctus erat, at varius ipsum. </Col>
            <Col sm>Praesent sit amet volutpat urna. Sed non auctor urna. Quisque aliquam sit amet leo vel ornare. Morbi ut ante nisi. Phasellus purus enim, tincidunt vel hendrerit vitae, sollicitudin eget sapien. Etiam bibendum mollis tincidunt. Nulla vitae maximus tortor. Integer consectetur quis ligula nec cursus. Nulla nisl magna, rutrum a luctus sit amet, commodo sed arcu. Aliquam eu efficitur nulla. Ut tristique tellus nec lacinia sollicitudin. Nam non mattis turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Col>
          </Row>
        </Container>)}
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
                  <Form.Label>Tekstikappale {index + 1 } &nbsp;&nbsp;&nbsp;&nbsp;</Form.Label><Button variant="secondary" id={index} onClick={(e) => del(e)}> Poista</Button>
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
        <Container fluid className="home-container">
            <h1>Home</h1>
            <p>Some text</p>
            <Map/>
            <Social/>
        </Container>
        </>
    );

}

export default Home;