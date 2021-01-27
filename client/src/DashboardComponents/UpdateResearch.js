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

const UpdateResearch = (props) => {
  const [ResearchTitle, setResearchTitle] = useState("");
  const [Researchphoto, setResearchphoto] = useState("");
  const [ResearchOverview, setResearchOverview] = useState("");
  const [Researchdetails, setResearchdetails] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const researches = {
      ResearchTitle,
      Researchphoto,
      ResearchOverview,
      Researchdetails,
    };

    setResearchTitle("");
    setResearchphoto("");
    setResearchOverview("");
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
    axios
      .get(`http://ips.syriantf.com/api/researches/${props.match.params.id}`)
      .then((res) => [
        setResearchTitle(res.data.ResearchTitle),
        setResearchphoto(res.data.Researchphoto),
        setResearchOverview(res.data.ResearchOverview),
        setResearchdetails(res.data.Researchdetails),
      ])
      .catch((error) =>
        props.setAlert("There was a problem in fetching data", "danger")
      );
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit Research
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={ResearchTitle}
              name="ResearchTitle"
              placeholder="عنوان البحث  "
              onChange={(e) => setResearchTitle(e.target.value)}
            />
          </Col>{" "}
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Researchphoto}
              name="Researchphoto"
              placeholder="رابط الصورة"
              onChange={(e) => setResearchphoto(e.target.value)}
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
                onChange={(e) => setResearchOverview(e.target.value)}
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
                onChange={(e) => setResearchdetails(e.target.value)}
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
              تعديل البحث
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

UpdateResearch.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateResearch);
