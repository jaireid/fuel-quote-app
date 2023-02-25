import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Navigation() {
    return (
        // <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        //     <Container>
        //         <Navbar.Brand href="#home">Fuel Quote App</Navbar.Brand>
        //         <Form className="d-flex">
        //             <Button variant="light">Sign Up</Button>
        //         </Form>
        //     </Container>
        // </Navbar>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Fuel Quote App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Fuel Quote Form</Nav.Link>
                        <Nav.Link href="#History">Quote History</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Button variant="light">Sign Out</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}