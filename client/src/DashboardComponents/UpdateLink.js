/** @format */
import React, { useEffect, Fragment, useState } from "react";
import Alert from "./Alert";
import { setAlert } from "../actions/alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

const UpdateLink = (props) => {
  const [LinkString, setLinkString] = useState("");
  const [LinkDiscription, setLinkDiscription] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const links = {
      LinkString,
      LinkDiscription,
    };

    setLinkString("");
    setLinkDiscription("");

    axios
      .put(`http://localhost:5000/api/links/${props.match.params.id}`, links)
      .then((res) => props.setAlert("Link has been updated", "success"))
      .catch((err) => {
        props.setAlert("Link has not been updated", "danger");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/links/${props.match.params.id}`)
      .then((res) => [
        setLinkString(res.data.LinkString),
        setLinkDiscription(res.data.LinkDiscription),
      ])
      .catch((error) =>
        props.setAlert("There was a problem in fetching data", "danger")
      );
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit Link info
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={LinkString}
              name="LinkString"
              placeholder="الرابط   "
              onChange={(e) => setLinkString(e.target.value)}
            />
          </Col>{" "}
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              value={LinkDiscription}
              name="LinkDiscription"
              placeholder=" وصف الرابط"
              onChange={(e) => setLinkDiscription(e.target.value)}
            />
          </Col>
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}></Col>
          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit">
              تعديل الرابط
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

UpdateLink.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateLink);
