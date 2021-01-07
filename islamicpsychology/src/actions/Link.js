/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import { Link_ADDED, Link_ERROR, UPDATE_Link, Delete_ERROR } from "./types";

// ADD Link

export const addLink = (LinkString, LinkDiscription) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    LinkString,
    LinkDiscription,
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/links",
      body,
      config
    );

    dispatch({
      type: Link_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Link has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Link_ERROR,
    });
  }
};

//Delete a Link
export const deletelink = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/links/${id}`);
      dispatch({
        type: UPDATE_Link,
      });
      dispatch(setAlert("link has been Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
