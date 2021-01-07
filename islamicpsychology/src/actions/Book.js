/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import {
  Book_ADDED,
  Book_ERROR,
  UPDATE_Book,
  Delete_ERROR,
} from "./types";

// ADD Book

export const addBook = (
BookTitle,
Bookhphoto,
BookDescription,
BookLink,
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
   BookTitle,
      Bookhphoto,
      BookDescription,
      BookLink,
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/books",
      body,
      config
    );

    dispatch({
      type: Book_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("book has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Book_ERROR,
    });
  }
};

//Delete a book
export const deletebook = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/books/${id}`
      );
      dispatch({
        type: UPDATE_Book,
      });
      dispatch(setAlert("book has been Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
