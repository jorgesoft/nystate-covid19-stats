import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';

const GlobalNavBar = () => (
    <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>NY State COVID-19</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link target="_blank" rel="noreferrer" href="https://github.com/gorj3/nystate-covid19-stats">GitHub</Nav.Link>
        </Nav>
    </Navbar>
    </>
  )
  
  export default GlobalNavBar;