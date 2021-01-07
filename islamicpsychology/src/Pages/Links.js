import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import "../components/main.css";
function Links(props) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/links");
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
      <div>
        <div className="linksimagestyle"></div>
        <Row className="justify-content-center">
          <text className="stylemaincontent" style={{ marginTop: "-175px" }}>
            {" "}
            روابط
          </text>
        </Row>
        <Table striped bordered hover className="tablestyle ">
          <thead>
            <tr>
              <th>الرابط</th>
              <th>الوصف</th>
            </tr>
          </thead>
          {currentPosts.map((post) => (
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={post.LinkString}
                    target="_blank"
                    rel="noopener noreferrer">
                    {post.LinkString}
                  </a>
                </td>
                <td
                  className="tableDescription"
                  style={{ textAlign: "center" }}>
                  {" "}
                  {post.LinkDiscription}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Links;
