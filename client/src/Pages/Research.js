/** @format */
import React, { useEffect, Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Research = (props) => {
  const [ResearchTitle, setResearchTitle] = useState("");
  const [Researchdetails, setResearchdetails] = useState("");

  const [loading, setLoading] = useState([false]);

  const changeonclick = (e) => {
    e.preventDefault();

    const researches = {
      ResearchTitle,
      Researchdetails,
    };

    setResearchTitle("");
    setResearchdetails("");

    axios
      .put(
        `http://ips.syriantf.com/api/researches/${props.match.params.id}`,
        researches
      )
      .then((res) => props.setAlert("Research has been updated", "success"))
      .catch((err) => {
        props.setAlert("Research has not been updated", "danger");
      });
  };
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://ips.syriantf.com/api/researches/${props.match.params.id}`)
      .then(
        (res) => [
          setResearchTitle(res.data.ResearchTitle),
          setResearchdetails(res.data.Researchdetails),
        ],
        setLoading(false)
      );
  }, [props]);

  if (loading)
    return (
      <div>
        <Spinner />
        <h6 className="text-center">...Loading</h6>;
      </div>
    );

  return (
    <Fragment>
      <div className="researchmagestyle"></div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          مزيد عن البحث
        </text>
      </Row>
      <Row className="justify-content-center">
        <Col xl={10} lg={10} md={10} sm={10} xs={10} className="text-center ">
          {" "}
          <h3 className="articletit">{ResearchTitle}</h3>
        </Col>
        <Col xl={10} lg={10} md={10} sm={10} xs={10} className="text-center ">
          <p className="articledetail">{Researchdetails}</p>
        </Col>{" "}
      </Row>
    </Fragment>
  );
};

Research.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Research);
