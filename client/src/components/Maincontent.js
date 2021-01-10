import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main.css";

const mystyle = {
  textAlign: "center",
};
function HomeContent(props) {
  return (
    <Jumbotron className="bg-transparent jumbotron-fluid p-0">
      <Container fluid={true} style={{ marginTop: "-25px" }}>
        <Row className="justify-content-center py-5">
          <Col md={8} sm={12}>
            {props.title && (
              <h3
                className="display-5 font-weight-blod stylemaincontent"
                style={mystyle}>
                {props.title}
              </h3>
            )}
            {props.subTitle && (
              <h4
                className="display-5 font-weight-light stylemaincontent"
                style={mystyle}>
                {props.subTitle}
              </h4>
            )}
            {props.text && (
              <h5
                className="lead font-weight-light stylemaincontent"
                style={mystyle}>
                {props.text}
              </h5>
            )}
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default HomeContent;
