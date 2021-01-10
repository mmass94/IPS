/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import {
  VIDEO_ERROR,
  VIDEO_ADDED,
  UPDATE_VIDEO,
  Delete_ERROR,
  VIDEO_UPDATED,
} from "./types";

// ADD VIDEO

export const addVideo = (
  VideoLink,
  VideoTitle,
  VideoSummary,
  VideoPublishDate
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    VideoLink,
    VideoTitle,
    VideoSummary,
    VideoPublishDate,
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/Videos",
      body,
      config
    );

    dispatch({
      type: VIDEO_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Video has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: VIDEO_ERROR,
    });
  }
};

//Delete a Video
export const deletevideo = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/videos/${id}`);
      dispatch({
        type: UPDATE_VIDEO,
      });
      dispatch(setAlert("Video Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Update VIDEO
export const updateVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/videos/${id}`);
    dispatch({
      type: UPDATE_VIDEO,
    });
    dispatch(setAlert("Video has been deleted", "success"));
  } catch (err) {
    dispatch({
      type: Delete_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
