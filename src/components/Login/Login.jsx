import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


export default function Login() {
	const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
    }

        setValidated(true);
    };

	return (
		<>
			<h1>Login Form</h1>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="username">
          			<Form.Label>Username</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							placeholder="Username"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Username required.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
				<Form.Group className="mb-3" controlId="password">
          			<Form.Label>Password</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="password"
							placeholder="Password"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Password required.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
				<Button type="submit" variant="outline-dark">Login</Button>{' '}
				<Button href="/register" variant="dark">Register</Button>
			</Form>
		</>
	)
};