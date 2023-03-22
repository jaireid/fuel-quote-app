import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  let navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSave = () => {
	//the following code will be replaced to check if the username/password match what is in the database
	username_array = [user123, username22, dmrobbin, user_name];
	password_array = [password123, password22, password445, password_password]

	position = username_array.indexOf(username);
	console.log(position);
	if(position == -1)
	{
		console.log("no account with this username")
	}
	else if(password_array[position] == password)
	{
		//log user in
	}
	else
	{
		console.log("username or password is incorrect")
	}

    //console.log(`Username: ${username}, Password: ${password}`);
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