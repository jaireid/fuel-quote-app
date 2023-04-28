import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
const LOGIN_URL = '/login';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [putData, putQuoteData] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      const response = await axios.post(LOGIN_URL,
          JSON.stringify({ username, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );

      console.log(JSON.stringify(response?.data));
      navigate('/login'); 

      
    } catch (err) {
      console.error(err);
    }

    // fetch('http://localhost:3059/login',{
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(putData)
    // })
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.error(error));
  };


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Login Form</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='text' 
              placeholder='Username' 
              required
              value={username}
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type='invalid'>
              Username required.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='password' 
              placeholder='Password' 
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type='invalid'>
              Password required.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type='submit' variant='outline-dark'>Login</Button>{' '}
      </Form>
    </>
  );
};
