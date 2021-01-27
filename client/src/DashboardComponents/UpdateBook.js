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

const UpdateBook = (props) => {
  const [BookTitle, setBookTitle] = useState("");
  const [Bookhphoto, setBookphoto] = useState("");
  const [BookDescription, setBookDescription] = useState("");
  const [BookLink, setBookLink] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const books = {
      BookTitle,
      Bookhphoto,
      BookDescription,
      BookLink,
    };

    setBookTitle("");
    setBookphoto("");
    setBookDescription("");
    setBookLink("");

    axios
      .put(`http://ips.syriantf.com/api/books/${props.match.params.id}`, books)
      .then((res) => props.setAlert("book has been updated", "success"))
      .catch((err) => {
        props.setAlert("Book has not been updated", "danger");
      });
  };
  useEffect(() => {
    axios
      .get(`http://ips.syriantf.com/api/books/${props.match.params.id}`)
      .then((res) => [
        setBookTitle(res.data.BookTitle),
        setBookphoto(res.data.Bookhphoto),
        setBookDescription(res.data.BookDescription),
        setBookLink(res.data.BookLink),
      ])
      .catch((error) =>
        props.setAlert("There was a problem in fetching data", "danger")
      );
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit Book info
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={BookTitle}
              name="BookTitle"
              placeholder="عنوان الكتاب  "
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </Col>{" "}
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Bookhphoto}
              name="Bookhphoto"
              placeholder="رابط الصورة"
              onChange={(e) => setBookphoto(e.target.value)}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                placeholder="وصف الكتاب  "
                value={BookDescription}
                name="BookDescription"
                onChange={(e) => setBookDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={1}
                type="text"
                placeholder="رابط  الكتاب"
                value={BookLink}
                name="BookLink"
                onChange={(e) => setBookLink(e.target.value)}
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
              تعديل الكتاب
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

UpdateBook.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateBook);
