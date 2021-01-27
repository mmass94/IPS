/** @format */
import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "../components/layout/Spinner";
import Pagination from "../DashboardComponents/Pagenation";
import axios from "axios";
import "../components/main.css";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { deleteadmin } from "../actions/auth";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import updateadmin from "./auth/UpdateAdmin";

const AdminList = ({ auth: { isAuthenticated }, deleteadmin }) => {
  const [posts, setposts] = useState([0]);
  const [loading, setLoading] = useState([false]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://ips.syriantf.com/api/admins");
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

  const deleteAdminFromList = (postId) => {
    deleteadmin(postId);
    setposts((prev) => prev.filter((a) => a._id !== postId));
  };

  const updateAdminFromList = (postId) => {
    updateadmin(postId);
    setposts((prev) => prev.filter((a) => a._id !== postId));
  };

  if (loading)
    return (
      <div>
        <Spinner />
        <h6 className="text-center">...Loading</h6>;
      </div>
    );

  //Delete an admin
  return (
    <Fragment>
      <Alert />

      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th className="thcolor">Update</th>
              <th className="thcolor">Delete</th>
              <th className="thcolor">Username</th>
              <th className="thcolor">Admin FullName</th>
            </tr>
          </thead>
          {currentPosts.map((post) => (
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => {
                      updateAdminFromList(post._id);
                    }}
                    className="btn btn-warning btn-sm"
                    variant="outline-warning"
                    size="sm">
                    <text style={{ color: "black" }}>Update</text>
                  </Button>{" "}
                </td>

                <td style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => {
                      deleteAdminFromList(post._id);
                    }}
                    className="btn btn-danger btn-sm"
                    size="sm">
                    Delete
                  </Button>{" "}
                </td>

                <td style={{ textAlign: "center" }}>
                  <text className="videotitlestyle ">{post.FullName}</text>
                </td>

                <td style={{ textAlign: "center" }}>
                  <text className="videotitlestyle ">{post.Username}</text>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <div style={{ marginLeft: "10px" }}>
          <Link to="/register"> Register new Admin</Link>
        </div>
        <div></div>
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

AdminList.propTypes = {
  adminlist: PropTypes.array.isRequired,
  deleteadmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteadmin })(AdminList);
