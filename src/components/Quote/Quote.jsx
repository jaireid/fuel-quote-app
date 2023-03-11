import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import {DatePicker} from 'reactstrap-date-picker'

export default function Quote() {
    const [gallons, setGallons] = useState('');
    const [date, setDate] = useState(new Date().toISOString());
    const [fmtValue, setFmtValue]= useState(undefined);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleChange = (dT, fD) => {
        setDate(dT);
        setFmtValue(fD);
    };

    const collectData = () => {
        console.warn(gallons);
        console.warn(date);
    }

    return (
        <>
            <h1>Fuel Quote Form</h1>
            {/* The noValidate attribute disables the default browser UI for forms */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='gallons'>
                    <Form.Label>Gallons Requested</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control 
                            type='number' 
                            placeholder='Number of gallons' 
                            value={gallons} 
                            onChange={(event) => setGallons(event.target.value)} 
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
              				Please select the number of gallon you want.
            			</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className='mb-3' controlId='deliveryAddress'>
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='123 Main Street' 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='deliveryDate'>
                    <Form.Label>Delivery Date</Form.Label>
                        <InputGroup hasValidation>
                            <DatePicker
                                type='date'
                                minDate={new Date().toString()}
                                value={date} 
                                onChange={(d,f) => handleChange(d, f)}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please select a Delivery Date.
                            </Form.Control.Feedback>
                        </InputGroup>
                </Form.Group>
                <Form.Group className='mb-3' controlId='suggestedPrice'>
                    <Form.Label>Suggested Price</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='4.50' 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='amountDue'>
                    <Form.Label>Total Amount Due</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='90' 
                        readOnly
                    />
                </Form.Group>
                <Button 
                    type='submit' 
                    variant='outline-dark'
                    onClick={collectData}
                >
                    Request Quote
                </Button>
            </Form>
        </>
  );
}