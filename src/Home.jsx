import React from "react";
import Navbar from "./Navbar";
import Producers from "./Producers";
import Directors from "./Directors";
import { Row, Col } from "react-bootstrap";
import Movies from "./Movies";
import ProducerFilter from "./ProducerFilter";

const Home = () => {
  return (
    <div className="px-5">
      <h1 className="text-center">React Application</h1>
      <Navbar />
      <Row>
        <Col md={3}>
          <Producers />
          <Directors />
          <ProducerFilter />
        </Col>
        <Col md={9}>
          <Movies />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
