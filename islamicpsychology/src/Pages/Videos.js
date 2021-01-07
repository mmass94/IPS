/** @format */
import React, { Fragment, useEffect, useState } from "react";
import "../components/main.css";
import Col from "react-bootstrap/Col";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import hvr from "hover.css";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import Spinner from "../components/layout/Spinner"
import Pagination from "../DashboardComponents/Pagenation"
import axios from "axios";
import "../components/main.css";


const Videos = () => {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios
        .get("http://localhost:5000/api/videos")
      setposts(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // get Current Posts
  const indexOfLastVideo = CurrentPage * postsPerPage;
  const indexOfFirstVideo = indexOfLastVideo - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstVideo, indexOfLastVideo);

  //change Page 
  const paginate = pageNumber => setCurrentPage(pageNumber);


  if (loading)
    return (
      <div>
        <Spinner />
        <h6 className="text-center">...Loading</h6>;
      </div>

    )

  return (
        <Fragment>

    <div>
      <div className="videomagestyle"></div>
            <Row className="justify-content-center">
        <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
          {" "}
          فيديوهات
        </text>
      </Row>
      { currentPosts.map(post => (
        <Container fluid={true} className="text-center" >

          <Col xl={4} lg={4} md={6} sm={12} xs={12} className="videosmargin" >
            <div className="text-center">
              <ResponsiveEmbed
                aspectRatio="16by9"
                className="iframcustom hvr-grow">
                <embed src={post.VideoLink} />
              </ResponsiveEmbed>
              <h6 className="videotitlestyle">{post.VideoTitle}</h6>
              <p className="videotextstyle"> {post.VideoSummary}</p>
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
    </div>

      </Fragment>

  );

}
export default Videos;
