/** @format */
import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../components/main.css";
import Button from "react-bootstrap/Button";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { connect } from "react-redux";

//Redux
const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    FullName: "",
    Username: "",
    Password: "",
    PasswordConfirmation: "",
  });

  const { FullName, Username, Password, PasswordConfirmation } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Password !== PasswordConfirmation) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(FullName, Username, Password);
    }
  };

  return (
    <Fragment>
      <Alert />
      <Form className="form LoginForm upspace" onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={FullName}
              name="FullName"
              placeholder="الاسم الكامل "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Username}
              name="Username"
              placeholder="اسم المستخدم"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            {" "}
            <Form.Control
              type="Password"
              value={Password}
              name="Password"
              placeholder="كلمة المرور"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            {" "}
            <Form.Control
              type="Password"
              value={PasswordConfirmation}
              name="PasswordConfirmation"
              placeholder="تأكيد كلمة المرور"
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
              إضافة مستخدم
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
