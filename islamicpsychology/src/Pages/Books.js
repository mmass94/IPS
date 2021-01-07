/** @format */

import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "../components/main.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Books(props) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/books");
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
    <div >
      <div className="articlemagestyle"></div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          كتب
        </text>
      </Row>

      {currentPosts.map((post) => (
        <Container fluid={true} >
          <Col xl={3} lg={3} md={4} sm={6} xs={6} className="text-center ">
            <div
              className="bookimage1style"
              style={{
                backgroundImage: `url(${post.Bookhphoto})`,
              }}></div>
            <h4 className="articletitle">{post.BookTitle} </h4>
            <p className="articletextstyle displayinline">
              {post.BookDescription}{" "}
            </p>
            <br />

            <p className="booklinkstyle displayinline">{post.BookLink} </p>
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
    </div>
  );
}
export default Books;
