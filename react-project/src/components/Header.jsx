import React from 'react'
import { Nav, Navbar, Container, Form, Button, Image } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom'
const Header = () => {
    const nav = useNavigate();
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary"  bg= 'dark' data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/"><Image src='/jinflix-logo.png'
                    width={100}
                    style={{margin: 0,
                    padding: 0}}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                        >
                            <Link to="/" className='link-item'>Home</Link>
                            <Link to="/" className='link-item'>Movie</Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                variant="light"
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-danger" 
                                type='submit'
                                onSubmit={(e)=>{
                                    e.preventDefault
                                nav('/')}}>
                                    Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header