/** @format */

import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Alert from "./Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addQuestion } from "../actions/Question";

const AddQuestion = ({ addQuestion, history }) => {
  const [formData, setFormData] = useState({
    QString: "",
    Answer: "",
  });

  const { QString, Answer } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addQuestion(QString, Answer);
  };

  return (
    <Fragment>
      <Alert />

      <Form className="form LoginForm " onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={QString}
              name="QString"
              placeholder=" نص السؤال "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              value={Answer}
              name="Answer"
              placeholder="  الجواب "
              onChange={(e) => onChange(e)}
            />
          </Col>
          <br></br>

          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit">
              إضافة السؤال
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default connect(null, { addQuestion })(withRouter(AddQuestion));
