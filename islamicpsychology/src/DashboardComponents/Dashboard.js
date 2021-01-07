/** @format */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../components/main.css";
import Col from "react-bootstrap/Col";
import "../components/main.css";

const Dashboard = ({ auth: { admin } }) => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <h3 style={{ textAlign: "center", marginTop: "10px" }}> Dashboard</h3>
      <Col
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="text-center"
        style={{ textAlign: "center" }}>
        <text className="spright"> Welcome {admin && admin.FullName}</text>
      </Col>
      <i className="fa fa-user" />

      <br></br>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
