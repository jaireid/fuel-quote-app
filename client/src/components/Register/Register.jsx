import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Register() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
    	}

        setValidated(true);
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