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

const UpdateVideo = (props) => {
  const [VideoLink, setVideoLink] = useState("");
  const [VideoTitle, setVideoTitle] = useState("");
  const [VideoSummary, setVideoSummary] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const videos = {
      VideoLink,
      VideoTitle,
      VideoSummary,
    };

    setVideoLink("");
    setVideoTitle("");
    setVideoSummary("");

    axios
      .put(`http://localhost:5000/api/Videos/${props.match.params.id}`, videos)
      .then((res) => props.setAlert("Video has been updated", "success"))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Videos/${props.match.params.id}`)
      .then((res) => [
        setVideoLink(res.data.VideoLink),
        setVideoTitle(res.data.VideoTitle),
        setVideoSummary(res.data.VideoSummary),
      ])
      .catch((error) => setAlert("Video has not been updated", "danger"));
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit Video
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={8} lg={8} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={VideoLink}
              name="VideoLink"
              placeholder="رابط الفيديو "
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </Col>

          <Col xl={4} lg={4} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={VideoTitle}
              name="VideoTitle"
              placeholder="عنوان الفيديو"
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </Col>
          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="مختصر عن الفيديو"
                value={VideoSummary}
                name="VideoSummary"
                onChange={(e) => setVideoSummary(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit">
              تعديل الفيديو
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

UpdateVideo.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateVideo);
