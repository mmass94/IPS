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
import { addVideo } from "../actions/Video";
const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
const currentdate = new Date().toLocaleDateString("en-US", DATE_OPTIONS);

const AddVideo = ({ addVideo, history }) => {
  const [formData, setFormData] = useState({
    VideoLink: "",
    VideoTitle: "",
    VideoSummary: "",
    VideoPublishDate: currentdate
  });


  const { VideoLink, VideoTitle, VideoSummary, VideoPublishDate } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addVideo(VideoLink, VideoTitle, VideoSummary, VideoPublishDate);
  };

  return (
    <Fragment>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={(e) => onSubmit(e)}>
        <Row className="justify-content-center ">
          <Col xl={8} lg={8} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={VideoLink}
              name="VideoLink"
              placeholder="رابط الفيديو "
              onChange={(e) => onChange(e)}
            />
          </Col>

          <Col xl={4} lg={4} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={VideoTitle}
              name="VideoTitle"
              placeholder="عنوان الفيديو"
              onChange={(e) => onChange(e)}
            />
          </Col>
          <br></br>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
      <Form.Group controlId="exampleForm.ControlTextarea1">

    <br></br>
    <Form.Control as="textarea" rows={3}
      type="text"
    placeholder="مختصر عن الفيديو"
      value={VideoSummary}
      name="VideoSummary"
      onChange={(e) => onChange(e)}
    />
  </Form.Group>
          </Col>

          <Row className="justify-content-center ">
            <Button
              variant="outline-info"
              size="md"
              className="AddUser"
              type="submit"
            >
              إضافة الفيديو
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
      <div className="footerspace"></div>
    </Fragment>
  );
};

AddVideo.propTypes = {
  addVideo: PropTypes.func.isRequired,
};

export default connect(null, { addVideo })(withRouter(AddVideo));
