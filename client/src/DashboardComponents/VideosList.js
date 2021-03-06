/** @format */
import React, { useEffect, useState, Fragment } from "react";
import Alert from "./Alert";
import Table from "react-bootstrap/Table";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import "../components/main.css";
import { deletevideo } from "../actions/Video";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const VideosList = ({ deletevideo }) => {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://ips.syriantf.com/api/videos");
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

  const deleteVideoFromList = (postId) => {
    deletevideo(postId);
    setposts((prev) => prev.filter((a) => a._id !== postId));
  };

  if (loading)
    return (
      <div>
        <Spinner />
        <h6 className="text-center">...Loading</h6>;
      </div>
    );

  //Delete and update a video
  return (
    <Fragment>
      <Alert />
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th className="thcolor">Update</th>
              <th className="thcolor">Delete</th>
              <th className="thcolor">Video Title</th>
            </tr>
          </thead>
          {currentPosts.map((post) => (
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/UpdateVideo/${post._id}`}>
                    {" "}
                    <Button
                      className="btn btn-warning btn-sm"
                      variant="outline-warning"
                      size="sm">
                      {" "}
                      <text style={{ color: "black" }}>Update</text>
                    </Button>{" "}
                  </Link>
                </td>

                <td style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => deleteVideoFromList(post._id)}
                    className="btn btn-danger btn-sm"
                    size="sm">
                    {" "}
                    Delete
                  </Button>{" "}
                </td>

                <td style={{ textAlign: "center" }}>
                  <text className="videotitlestyle ">{post.VideoTitle}</text>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <div>
          <Link to="/AddVideo"> Add new Video</Link>
        </div>
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
};

VideosList.propTypes = {
  videolist: PropTypes.array.isRequired,
  deletevideo: PropTypes.func.isRequired,
};

export default connect(null, { deletevideo })(VideosList);
