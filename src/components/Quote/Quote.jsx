import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Datetime from 'react-datetime';
import InputGroup from 'react-bootstrap/InputGroup';
import "react-datetime/css/react-datetime.css";

export default function Quote() {
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
            <h1>Fuel Quote Form</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="gallons">
                    <Form.Label>Gallons Requested</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control 
                            type="number" 
                            placeholder="Number of gallons" 
                            required
                        />
                        <Form.Control.Feedback type="invalid">
              				Please select the number of gallon you want.
            			</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="deliveryAddress">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control 
                        type="text"  
                        placeholder="123 Main Street" 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="deliveryDate">
                    <Form.Label>Delivery Date</Form.Label>
                    <Datetime
                        timeFormat={false}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="suggestedPrice">
                    <Form.Label>Suggested Price:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="4.50" 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amountDue">
                    <Form.Label>Total Amount Due</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="90" 
                        readOnly
                    />
                </Form.Group>
                <Button type="submit" variant="outline-dark">Request Quote</Button>
            </Form>
        </>
  );
}