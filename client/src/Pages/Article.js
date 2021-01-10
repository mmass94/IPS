/** @format */
import React, { useEffect, Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Article = (props) => {
  const [Articledetails, setArticledetails] = useState("");
  const [ArticleTitle, setArticleTitle] = useState("");

  const [loading, setLoading] = useState([false]);

  const changeonclick = (e) => {
    e.preventDefault();

    const articles = {
      ArticleTitle,
      Articledetails,
    };

    setArticleTitle("");
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
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/articles/${props.match.params.id}`)
      .then(
        (res) => [
          setArticledetails(res.data.Articledetails),
          setArticleTitle(res.data.ArticleTitle),
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
      <div className="articlemagestyle"></div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          تفاصيل المقالة
        </text>
      </Row>
      <Row className="justify-content-center">
        <Col xl={10} lg={10} md={10} sm={10} xs={10} className="text-center ">
          {" "}
          <h3 className="articletit">{ArticleTitle}</h3>
        </Col>
        <Col xl={10} lg={10} md={10} sm={10} xs={10} className="text-center ">
          <p className="articledetail">{Articledetails}</p>
        </Col>{" "}
      </Row>

      <div className="footerspace"></div>
    </Fragment>
  );
};

Article.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Article);
