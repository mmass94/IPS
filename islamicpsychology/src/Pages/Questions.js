import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import "../components/main.css";
import Row from "react-bootstrap/Row";
import QuestionsComponent from "../components/QuestionsComponent";

function Questions(props) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/questions");
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
      {" "}
      <div className="Questionsimagestyle"> </div>
      <Container fluid={true} className="text-center">
        <Row className="justify-content-center">
          <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
            {" "}
            أسئلة
          </text>
        </Row>
        {currentPosts.map((post) => (
          <QuestionsComponent post={post} />
        ))}
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-center ">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </Col>
      </Container>
    </div>
  );
}
export default Questions;
