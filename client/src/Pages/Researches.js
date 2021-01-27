/** @format */
import "../components/main.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import { Link } from "react-router-dom";

function Researches(props) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://ips.syriantf.com/api/researches");
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
    <div>
      <div className="researchmagestyle"></div>
      <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          أبحاث
        </text>
      </Row>
      {currentPosts.map((post) => (
        <Container fluid={true} className="text-center">
          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            className="text-center  researchcardbottomspace ">
            <Card className="ResearchCard ">
              <Card.Img
                variant="top"
                className="ReseacheImage2"
                style={{
                  backgroundImage: `url(${post.Researchphoto})`,
                }}
              />
              <Card.Body>
                <Card.Title className="CardTitle">
                  {post.ResearchTitle}
                </Card.Title>
                <Card.Text className="ResearchText">
                  {post.ResearchOverview}
                </Card.Text>
                <a href="/Research" rel="noopener noreferrer">
                  <Link to={`/Research/${post._id}`}>
                    <Button
                      variant="outline-info"
                      className="ReseachbuttonReadMore">
                      اقرأ المزيد عن هذا البحث
                    </Button>{" "}
                  </Link>
                </a>
              </Card.Body>
            </Card>
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

export default Researches;
