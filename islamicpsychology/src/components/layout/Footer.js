/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { SocialIcon } from "react-social-icons";
import "../main.css";

function Footer() {
  return (
    <footer className="footerstyle font-small footer navbar-fixed-bottom ">
      <Container fluid={true}>
        <Row className=" justify-content-center icons ">
          <Col xl={3} lg={3} className="text-center"></Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon url="https://www.linkedin.com/in/mohammad-al-masalma-987572193/" />
          </Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon
              url="https://twitter.com/explore"
              className="iconspace"
            />
          </Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon url="https://www.facebook.com/in/mohammad-al-masalma-987572193/" />
          </Col>
          <br /> <br /> <br />
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon url="https://www.whatsapp.com/in/mohammad-al-masalma-987572193/" />
          </Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon url="https://www.youtube.com/in/mohammad-al-masalma-987572193/" />
          </Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            xs={4}
            className="text-center"
            style={{ paddingTop: "20px" }}>
            <SocialIcon url="https://www.snapchat.com/in/mohammad-al-masalma-987572193/" />
          </Col>
          <Col xl={3} lg={3} md={4} sm={4} xs={4} className="text-center"></Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-center">
            <p className="text-center footertext">
              Copyright &copy; {new Date().getFullYear()} IslamicPsychology
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
