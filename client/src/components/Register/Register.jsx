import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
    	}

        setValidated(true);

        // Log user input
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log(`Confirm Password: ${confirmPassword}`);
		const response = await axios.get(`/register?username=${username}&password=${password}`);
		Navigate('/login')
    };

    return (
        <>
            <h1>Register</h1>
			{/* noValidate attribute disables the default browser UI for forms */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='username'>
          			<Form.Label>Username</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type='text' 
							placeholder='Username' 
							required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
						/>
						<Form.Control.Feedback type='invalid'>
							Please choose a username.
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
                            onChange={(e) => setPassword(e.target.value)}
						/>
						<Form.Control.Feedback type='invalid'>
							Please choose a password.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Form.Group className='mb-3' controlId='confirmPassword'>
          			<Form.Label>Confirm Password</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type='password' 
							placeholder='Confirm Password' 
							required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Form.Control.Feedback type='invalid'>
							Please confirm password.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Button type='submit' variant='outline-dark'>Register</Button>
            </Form>
        </>
    );
}
