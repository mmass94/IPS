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
import { addResearch } from "../actions/Research";
const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const currentdate = new Date().toLocaleDateString("en-US", DATE_OPTIONS);

const AddResearch = ({ addResearch, history }) => {
  const [formData, setFormData] = useState({
    ResearchTitle: "",
    Researchphoto: "",
    ResearchOverview: "",
    Researchdetails: "",
    ResearchPublishDate: currentdate,
  });

  const {
    ResearchTitle,
    Researchphoto,
    ResearchOverview,
    Researchdetails,
    ResearchPublishDate,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addResearch(
      ResearchTitle,
      Researchphoto,
      ResearchOverview,
      Researchdetails,
      ResearchPublishDate
    );
  };

  return (
    <Fragment>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={ResearchTitle}
              name="ResearchTitle"
              placeholder="عنوان البحث  "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Researchphoto}
              name="Researchphoto"
              placeholder="رابط الصورة"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                placeholder="لمحة عن البحث"
                value={ResearchOverview}
                name="ResearchOverview"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
          </Col>
          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="تفاصيل  البحث"
                value={Researchdetails}
                name="Researchdetails"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}></Col>
          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit">
              إضافة البحث
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

addResearch.propTypes = {
  addResearch: PropTypes.func.isRequired,
};
export default connect(null, { addResearch })(withRouter(AddResearch));
