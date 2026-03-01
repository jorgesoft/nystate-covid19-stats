import React from 'react';

import {Navbar, Nav, Container} from 'react-bootstrap';

const GlobalNavBar = () => (
    <Navbar bg="dark" variant="dark" className="py-1 shadow-sm">
        <Container>
            <Navbar.Brand className="fw-semibold fs-5 mb-0">NY State COVID-19</Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link className="fs-6" target="_blank" rel="noreferrer" href="https://github.com/gorj3/nystate-covid19-stats">GitHub</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
  
  export default GlobalNavBar;