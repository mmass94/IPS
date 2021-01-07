/** @format */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../components/main.css";
const Alert = ({ alerts }) =>
  alert !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
Alert.PropTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alert);
