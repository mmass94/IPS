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
const UpdateQuestion = (props) => {
  const [QString, setQString] = useState("");
  const [Answer, setAnswer] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const questions = {
      QString,
      Answer,
    };

    setQString("");
    setAnswer("");

    axios
      .put(`http://localhost:5000/api/questions/${props.match.params.id}`, questions)
      .then((res) => props.setAlert("question has been updated", "success"))
      .catch((err) => {
        props.setAlert("question has not been updated", "danger");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/questions/${props.match.params.id}`)
      .then((res) => [
        setQString(res.data.QString),
        setAnswer(res.data.Answer),
      ])
      .catch((error) =>
        props.setAlert("There was a problem in fetching data", "danger")
      );
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit question info
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={QString}
              name="QString"
              placeholder="نص السؤال   "
              onChange={(e) => setQString(e.target.value)}
            />
          </Col>{" "}
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              value={Answer}
              name="Answer"
              placeholder=" جواب السؤال "
              onChange={(e) => setAnswer(e.target.value)}
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
              تعديل السؤال
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

UpdateQuestion.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateQuestion);
