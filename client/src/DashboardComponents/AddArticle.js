/** @format */

import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Alert from "./Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FileUpload from "./FileUpload";
import Button from "react-bootstrap/Button";
import { addArticle } from "../actions/Article";
import fileUpload from "express-fileupload";
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

const AddArticle = ({ addArticle, history }) => {
  const [formData, setFormData] = useState({
    ArticleTitle: "",
    ArticleAuthor: "",
    ArticleSource: "",
    ArticlePublishDate: currentdate,
    ArticleOverview: "",
    Articlephoto: "",
    Articledetails: "",
  });

  const {
    ArticleTitle,
    ArticleAuthor,
    ArticleSource,
    ArticlePublishDate,
    ArticleOverview,
    Articlephoto,
    Articledetails,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addArticle(
      ArticleTitle,
      ArticleAuthor,
      ArticleSource,
      ArticlePublishDate,
      ArticleOverview,
      Articlephoto,
      Articledetails
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
              value={ArticleTitle}
              name="ArticleTitle"
              placeholder="عنوان المقالة  "
              onChange={(e) => onChange(e)}
            />
          </Col>
          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Articlephoto}
              name="Articlephoto"
              placeholder="رابط الصورة"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              as="textarea"
              rows={1}
              value={ArticleAuthor}
              name="ArticleAuthor"
              placeholder=" مؤلف المقالة"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              as="textarea"
              rows={1}
              value={ArticleSource}
              name="ArticleSource"
              placeholder=" مصدر المقالة"
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
                placeholder="لمحة عن المقالة"
                value={ArticleOverview}
                name="ArticleOverview"
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
                placeholder="تفاصيل  المقالة"
                value={Articledetails}
                name="Articledetails"
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
              إضافة المقالة
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

AddArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
};
export default connect(null, { addArticle })(withRouter(AddArticle));
