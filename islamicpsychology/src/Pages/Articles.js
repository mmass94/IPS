import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "../components/main.css";
import { Link } from "react-router-dom";

function Articles(props) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/articles");
      setposts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // get Current Posts
  const indexOfLastVideo = CurrentPage * postsPerPage;
  const indexOfFirstVideo = indexOfLastVideo - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstVideo, indexOfLastVideo);

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div>
        <Spinner />
        <h6 className="text-center">...Loading</h6>;
      </div>
    );

  return (
    <Fragment>
      {" "}
      <div className="articlemagestyle"></div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          مقالات
        </text>
      </Row>
      {currentPosts.map((post) => (
        <Container fluid={true} className="text-center">
          <Col xl={4} lg={4} md={6} sm={12} xs={12} className="text-center ">
            <div
              className="articleimage1style"
              style={{
                backgroundImage: `url(${post.Articlephoto})`,
              }}></div>
            <h4 className="articletitle">{post.ArticleTitle} </h4>
            <p className=" articletextstyle displayinline">
              {post.ArticleAuthor} | {post.ArticlePublishDate}
            </p>
            |{" "}
            <p className=" displayinline  articleResource">
              {" "}
              {post.ArticleSource}{" "}
            </p>
            <p className="articlemaxwidth">{post.ArticleOverview}</p>
            <div className="downarticle">
              <div className="articlerectangle"></div>
              <a href="/Article" rel="noopener noreferrer">
                <Link to={`/Article/${post._id}`}>
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="buttonposition">
                    اقرأ المزيد
                  </Button>
                </Link>
              </a>

              <div className="articlerectangle2"></div>
            </div>
          </Col>
        </Container>
      ))}
      <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-center ">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </Col>
    </Fragment>
  );
}

export default Articles;
