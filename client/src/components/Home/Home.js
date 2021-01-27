import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <Container
      fluid
      className="home-page-wrapper d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="home-header-wrapper">
        <h1 className="home-header">
          Create <span className="blue">quack</span>, real-time
          <span className="green"> polls</span>
        </h1>
      </Row>
      <Row>
        <Link className="create-btn" to="/poll/new">
          <Button className="create m-4 py-2 px-4"> Create Polls</Button>
        </Link>
      </Row>
      <Row>
        <sub className="mt-2">
          No registration required, it’s 100% free and takes less than a minute.
        </sub>
      </Row>
    </Container>
  );
}

export default Home;
