import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from "react-bootstrap";

import "./CustomNavbar.css"

function CustomNavbar() {
  return (
    <div className = "custom-navbar m-2">
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand className="brand" href="/"><span className="blue">Quack</span><span className="green">Polls</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto offset-4">
            <Link className="mr-4 link" to="/public">Public Polls</Link>
            <Link className="link" to="/poll/new">Create Polls</Link>
          </Nav>
          <Nav className="login">
            <Link  className="mr-4 d-flex align-items-center link" to= "/login"><span>Login</span></Link>
            <Link to="/register">
              <Button> Sign Up</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
