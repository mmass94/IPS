/** @format */
import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../../DashboardComponents/Alert";
import { setAlert } from "../../actions/alert";
import "../../components/main.css";

const AdminLogin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const { Username, Password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Password !== Password) {
      setAlert("Password is not correct", "danger");
    } else {
      login(Username, Password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Alert />
      <h3 className="text-center" style={{ marginTop: "10px" }}>
        Login Page
      </h3>
      <Form className="form LoginForm " onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Username}
              name="Username"
              placeholder="اسم المستخدم"
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Form.Control
              type="Password"
              value={Password}
              name="Password"
              placeholder="كلمة المرور"
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Button
            variant="outline-info"
            size="md"
            className="LoginButton"
            type="submit">
            تسجيل الدخول
          </Button>{" "}
        </Row>
      </Form>
    </Fragment>
  );
};
AdminLogin.protoTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(AdminLogin);
