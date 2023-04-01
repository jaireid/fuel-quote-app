import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`/login?username=${username}&password=${password}`);
    console.log(response.data);
  };

  let navigate = useNavigate();

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

export default Login;