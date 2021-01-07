/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import { Question_ADDED,  Question_ERROR, UPDATE_Question, Delete_ERROR } from "./types";

// ADD Question

export const addQuestion = (QString, Answer) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    QString,
    Answer,
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/questions",
      body,
      config
    );

    dispatch({
      type: Question_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Question has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Question_ERROR,
    });
  }
};

//Delete a question
export const deletequestion = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/questions/${id}`);
      dispatch({
        type: UPDATE_Question,
      });
      dispatch(setAlert("Question has been Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
