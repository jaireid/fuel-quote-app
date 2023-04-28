import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
// import axios from 'axios';
import axios from '../../api/axios';
const REGISTER_URL = '/register';

export default function Register() {
    const [validated, setValidated] = useState(false);
	const [putData, putQuoteData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

		const { username, password, confirmPassword } = putData;

		if (!username || !password || !confirmPassword) {
			console.error('Missing required fields');
			return;
		  }
		
		if (password !== confirmPassword) {
		console.error('Passwords do not match');
		return;
		}

		// const data = {
		// 	username,
		// 	password,
		// 	confirmPassword
		// };

		// axios.post('http://localhost:3059/register', data, { withCredentials: true })
		// 	.then(response => {
		// 		console.log(response);
		// 	})
		// 	.catch(error => console.error(error));

		try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password, confirmPassword}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
			console.log(response);
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
           
        } catch (error) {
            error => console.error(error)
		}
		
        // fetch('http://localhost:3059/register', {
        //     method: 'POST',
		// 	credentials: 'include',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(putData)
        //   })
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error));
    };

    const handleUsernameChange = (event) => {
		const { name, value } = event.target;
		if(name === "username") {
			const username = value;
			putQuoteData({ ...putData, username });
		}
    }

	const handleUsernamePassword = (event) => {
		const { name, value } = event.target;
		if(name === "password") {
			const password = value;
			putQuoteData({ ...putData, password });
		}
    }

	const handleUsernameConfirmPassword = (event) => {
		const { name, value } = event.target;
		if(name === "confirmPassword") {
			const confirmPassword = value;
			putQuoteData({ ...putData, confirmPassword });
		}
    }

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
							name='username'
							placeholder='Username' 
							required
							onChange={handleUsernameChange}
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
							name='password'
							placeholder='Password' 
							required
							onChange={handleUsernamePassword}
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
							name='confirmPassword'
							placeholder='Confirm Password' 
							required
							onChange={handleUsernameConfirmPassword}
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
