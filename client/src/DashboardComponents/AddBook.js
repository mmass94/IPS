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
import { addBook } from "../actions/Book";


const AddBook = ({ addBook, history }) => {
  const [formData, setFormData] = useState({
BookTitle:"",
Bookhphoto:"",
BookDescription:"",
BookLink:"",
  });


  const { BookTitle, Bookhphoto, BookDescription, BookLink } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addBook(BookTitle, Bookhphoto, BookDescription, BookLink);
  };

  return (
    <Fragment>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={BookTitle}
              name="BookTitle"
              placeholder="عنوان الكتاب "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Bookhphoto}
              name="Bookhphoto"
              placeholder="رابط الصورة "
              onChange={(e) => onChange(e)}
            />
          </Col>
          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
      <Form.Group controlId="exampleForm.ControlTextarea1">

    <br></br>
    <Form.Control as="textarea" rows={2}
      type="text"
    placeholder="  وصف الكتاب"
      value={BookDescription}
      name="BookDescription"
      onChange={(e) => onChange(e)}
    />
  </Form.Group>
          </Col>

             <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={BookLink}
              name="BookLink"
              placeholder="رابط الكتاب "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit"
            >
              إضافة الكتاب
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

AddBook.propTypes = {
  addBook: PropTypes.func.isRequired,
};

export default connect(null, { addBook })(withRouter(AddBook));
