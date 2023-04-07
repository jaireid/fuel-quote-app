import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fillData, setFillData] = useState("");

  useEffect(() => {
    fetch('http://localhost:3059/login/fill')
      .then(response => response.json())
      .then(data => {
        setFillData(data);
      })
      .catch(error => console.error(error));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    const putData = { username, password };

    fetch('http://localhost:3059/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(putData)
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSave = () => {
    // Write the data to a file or send it to an API for storage
    console.log(`Username: ${username}, Password: ${password}`);
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
        <Button 
          variant='dark'
          onClick={() => {
            navigate('/register');
          }}
          
        >
          Register
        </Button>
      </Form>
      <Button variant='success' onClick={handleSave}>
        Save
      </Button>
    </>
  );
};
