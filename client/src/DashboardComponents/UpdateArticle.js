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

const UpdateArticle = (props) => {
  const [ArticleTitle, setArticleTitle] = useState("");
  const [Articlephoto, setArticlephoto] = useState("");
  const [ArticleAuthor, setArticleAuthor] = useState("");
  const [ArticleSource, setArticleSource] = useState("");
  const [ArticleOverview, setArticleOverview] = useState("");
  const [Articledetails, setArticledetails] = useState("");

  const changeonclick = (e) => {
    e.preventDefault();

    const articles = {
      ArticleTitle,
      Articlephoto,
      ArticleAuthor,
      ArticleSource,
      ArticleOverview,
      Articledetails,
    };

    setArticleTitle("");
    setArticlephoto("");
    setArticleAuthor("");
    setArticleSource("");
    setArticleOverview("");
    setArticledetails("");

    axios
      .put(
        `http://localhost:5000/api/articles/${props.match.params.id}`,
        articles
      )
      .then((res) => props.setAlert("Article has been updated", "success"))
      .catch((err) => {
        props.setAlert("Article has not been updated", "danger");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${props.match.params.id}`)
      .then((res) => [
        setArticleTitle(res.data.ArticleTitle),
        setArticlephoto(res.data.Articlephoto),
        setArticleAuthor(res.data.ArticleAuthor),
        setArticleSource(res.data.ArticleSource),
        setArticleOverview(res.data.ArticleOverview),
        setArticledetails(res.data.Articledetails),
      ])
      .catch((error) =>
        props.setAlert("There was a problem in fetching data", "danger")
      );
  }, [props]);

  return (
    <Fragment>
      <h4 className="text-center" style={{ marginTop: "50px" }}>
        Edit Article
      </h4>
      <Alert />

      <Form className="form LoginForm upspace" onSubmit={changeonclick}>
        <Row className="justify-content-center ">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={ArticleTitle}
              name="ArticleTitle"
              placeholder="عنوان المقالة  "
              onChange={(e) => setArticleTitle(e.target.value)}
            />
          </Col>{" "}
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Control
              type="text"
              value={Articlephoto}
              name="Articlephoto"
              placeholder="رابط الصورة"
              onChange={(e) => setArticlephoto(e.target.value)}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={1}
                type="text"
                placeholder=" مؤلف المقالة "
                value={ArticleAuthor}
                name="ArticleAuthor"
                onChange={(e) => setArticleAuthor(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={1}
                type="text"
                placeholder=" مصدر المقالة "
                value={ArticleSource}
                name="ArticleSource"
                onChange={(e) => setArticleSource(e.target.value)}
              />
            </Form.Group>
          </Col>
          <br></br>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <br></br>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                placeholder="لمحة عن المقالة"
                value={ArticleOverview}
                name="ArticleOverview"
                onChange={(e) => setArticleOverview(e.target.value)}
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
                placeholder="تفاصيل  المقالة"
                value={Articledetails}
                name="Articledetails"
                onChange={(e) => setArticledetails(e.target.value)}
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
              تعديل المقالة
            </Button>{" "}
          </Row>
        </Row>
        <hr></hr>
      </Form>
    </Fragment>
  );
};

UpdateArticle.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UpdateArticle);
