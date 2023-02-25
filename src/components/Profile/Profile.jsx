import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
  
export default function Profile() {
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
            <h1>Profile Management</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
          			<Form.Label>Full Name</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							placeholder="Name"
                            maxLength="50"
							required
						/>
						<Form.Control.Feedback type="invalid">
                            Please enter your full name.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Form.Group className="mb-3" controlId="address1">
          			<Form.Label>Address 1</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							placeholder="Street address or P.O. Box"
                            maxLength="100"
							required
						/>
						<Form.Control.Feedback type="invalid">
                            Please enter your address.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Form.Group className="mb-3" controlId="address2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control 
                        type="text"  
                        placeholder="Apt, suite, unit, building, floor, ect." 
                        maxLength="100"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
          			<Form.Label>City</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							placeholder="Enter City"
                            maxLength="100"
							required
						/>
						<Form.Control.Feedback type="invalid">
                            Please enter your city.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Form.Group className="mb-3" controlId="state">
          			<Form.Label>State</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Select required>
                            <option value="">Select State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select your state.
						</Form.Control.Feedback>
                    </InputGroup>
        		</Form.Group>
                <Form.Group className="mb-3" controlId="zipcode">
          			<Form.Label>Zipcode</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							placeholder="Enter Zipcode"
                            minLength="5"
                            maxLength="9"
							required
						/>
						<Form.Control.Feedback type="invalid">
                            Please enter your zipcode.
						</Form.Control.Feedback>
					</InputGroup>
        		</Form.Group>
                <Button type="submit" variant="outline-dark">Save Changes</Button>
            </Form>
        </>

                            
    //                     </select>
    //                 </div>
    //                 <div>
    //                     <input type="text" required minlength='5' maxlength='9' placeholder="" id="" />
    //                 </div>
    );
}