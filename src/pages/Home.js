//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
//import { Image } from "react-bootstrap";

//To use edit:
//import { useState, useEffect } from 'react';
//import useAuth from "../hooks/useAuth";

const Home = () => {
    /* const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
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
        console.log("getTexts:" + JSON.stringify(textData));
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
    console.log("edit" + e.target.id);
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
    console.log("add");
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body, ""] });
  }

  const del = (e) => {
    console.log("del" + e.target.id);
    let newBody = textToEdit.body.filter((item, index) => index != e.target.id);
    setTextToEdit({ ...textToEdit, body: newBody });
  }

  const handleClose = () => setShow(false); */

}

export default Home;