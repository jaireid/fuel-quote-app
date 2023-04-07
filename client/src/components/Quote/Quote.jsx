import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Quote() {
    const [fillData, setFillData] = useState({});
    const [putData, putQuoteData] = useState({});
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3059/quotes/fill')
            .then(
                response => response.json()
            )
            .then(
                data => {
                    setFillData(data);
            })
    }, []);

    const handleSubmit = (event) => {
        // Prevents refresh on valid submit
        event.preventDefault();

        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        fetch('http://localhost:3059/quotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putData)
          })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.error(error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // putQuoteData({ ...putData, [name]: value });
        if (name === "gallons") {
            const suggestedPrice = fillData.price || 0;
            const gallons = parseFloat(value) || 0;
            const due = (gallons * suggestedPrice).toFixed(2);
            putQuoteData({ ...putData, gallons, due });
        } 
    }

    const handleDateChange = (date) => {
        setDeliveryDate(date);
        setErrors((prev) => ({ ...prev, deliveryDate: null }));
        putQuoteData({ ...putData, deliveryDate: date.toISOString().split('T')[0] });
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
                            name='gallons'
                            placeholder='Number of gallons' 
                            onChange={handleChange} 
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
                        value={fillData.address || ''}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='deliveryDate'>
                    <Form.Label>Delivery Date</Form.Label>
                        <InputGroup hasValidation>
                            <DatePicker 
                                selected={deliveryDate} 
                                onChange={handleDateChange} 
                                minDate={new Date()} 
                                dateFormat="yyyy-MM-dd" 
                                className={`form-control ${errors.deliveryDate ? "is-invalid" : ""}`}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.deliveryDate}
                            </Form.Control.Feedback>
                        </InputGroup>
                </Form.Group>
                <Form.Group className='mb-3' controlId='suggestedPrice'>
                    <Form.Label>Suggested Price</Form.Label>
                    <Form.Control 
                        type='number' 
                        value={fillData.price || ''} 
                        readOnly
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='amountDue'>
                    <Form.Label>Total Amount Due</Form.Label>
                    <Form.Control 
                        type='number' 
                        value={putData.due || ''} 
                        readOnly
                    />
                </Form.Group>
                <Button 
                    type='submit' 
                    variant='outline-dark'
                >
                    Request Quote
                </Button>
            </Form>
        </>
  );
}