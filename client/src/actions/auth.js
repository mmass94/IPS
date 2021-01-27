/** @format */
import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  Delete_ERROR,
  ADMIN_DELETE,
  ADMIN_UPDATE,
} from "./types";

import setAuthToken from "../utills/setAuthToken";

//Load admin
export const laodUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://ips.syriantf.com/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    //dispatch(laodUser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Admin Register

export const register = (FullName, Username, Password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ FullName, Username, Password });
  try {
    const res = await axios.post(
      "http://ips.syriantf.com/api/Admins",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("User Added", "success"));

    dispatch(laodUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Admin login

export const login = (Username, Password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ Username, Password });
  try {
    const res = await axios.post(
      "http://ips.syriantf.com/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(laodUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Username or Password is not correct", "danger"));
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

//Delete an admin
export const deleteadmin = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? this is can NOT be undone!")) {
    try {
      const res = await axios.delete(
        `http://ips.syriantf.com/api/admins/${id}`
      );
      dispatch({
        type: ADMIN_DELETE,
        payload: res.data,
      });

      dispatch(setAlert("Admin Deleted", "success"));
    } catch (err) {
      dispatch({
        type: Delete_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//update an admin
export const updateadmin = (FullName, Username, Password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ FullName, Username, Password });
  try {
    const res = await axios.post(
      "http://ips.syriantf.com/api/Admins",
      body,
      config
    );
  } catch (err) {
    dispatch({
      type: ADMIN_UPDATE,
    });
    dispatch(setAlert("User Added", "success"));
  }
};
