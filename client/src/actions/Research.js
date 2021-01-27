/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import {
  Research_ADDED,
  Research_ERROR,
  UPDATE_Research,
  Delete_ERROR,
} from "./types";

// ADD Research

export const addResearch = (
  ResearchTitle,
  Researchphoto,
  ResearchOverview,
  Researchdetails,
  ResearchPublishDate
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    ResearchTitle,
    Researchphoto,
    ResearchOverview,
    Researchdetails,
    ResearchPublishDate,
  });
  try {
    const res = await axios.post(
      "http://ips.syriantf.com/api/researches",
      body,
      config
    );

    dispatch({
      type: Research_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Research has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Research_ERROR,
    });
  }
};

//Delete a Research
export const deleteresearch = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(
        `http://ips.syriantf.com/api/researches/${id}`
      );
      dispatch({
        type: UPDATE_Research,
      });
      dispatch(setAlert("Research has been Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
