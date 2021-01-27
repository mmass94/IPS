/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import {
  ARTICLE_ADDED,
  ARTICLE_ERROR,
  UPDATE_ARTICLE,
  Delete_ERROR,
} from "./types";

// ADD VIDEO

export const addArticle = (
  ArticleTitle,
  ArticleAuthor,
  ArticleSource,
  ArticlePublishDate,
  ArticleOverview,
  Articlephoto,
  Articledetails
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    ArticleTitle,
    ArticleAuthor,
    ArticleSource,
    ArticlePublishDate,
    ArticleOverview,
    Articlephoto,
    Articledetails,
  });
  try {
    const res = await axios.post(
      "http://ips.syriantf.com/api/Articles",
      body,
      config
    );

    dispatch({
      type: ARTICLE_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Article has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ARTICLE_ERROR,
    });
  }
};

//Delete an Article
export const deletearticle = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(
        `http://ips.syriantf.com/api/articles/${id}`
      );
      dispatch({
        type: UPDATE_ARTICLE,
      });
      dispatch(setAlert("Article Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
