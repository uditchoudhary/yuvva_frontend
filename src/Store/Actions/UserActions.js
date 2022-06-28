import * as actiontypes from "./ActionTypes";
import { authInstance as AUTH_API } from "../../services/axiosConfig";

export const LogInUser = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.LOGIN_FETCH_LOADING, payload: true });
    await AUTH_API.post("/login", formData)
      .then((res) => {
        dispatch({
          type: actiontypes.SET_USER_PROFILE,
          payload: res.data.user,
        });
        dispatch({ type: actiontypes.LOG_IN });
        dispatch({ type: actiontypes.LOGIN_FETCH_LOADING, payload: false });
        dispatch({
          type: actiontypes.LOGIN_FAILURE_STATUS,
          payload: undefined,
        });
      })
      .catch((err) => {
        console.log(err.response.data.statusText);
        dispatch({
          type: actiontypes.LOGIN_FAILURE_STATUS,
          payload: err.response.data.statusText,
        });
        dispatch({ type: actiontypes.LOGIN_FETCH_LOADING, payload: false });
      });
  };
};

export const LogOutUser = () => {
  return async (dispatch) => {
    AUTH_API.get("/logout").then((res) => {
      dispatch({ type: actiontypes.LOG_OUT });
    });
  };
};

export const getUserProfile = () => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.PROFILE_FETCH_LOADING, payload: true });
    AUTH_API.get("/profile")
      .then((res) => {
        dispatch({
          type: actiontypes.SET_USER_PROFILE,
          payload: res.data,
        });
        dispatch({
          type: actiontypes.PROFILE_FETCH_FAILURE,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actiontypes.PROFILE_FETCH_FAILURE,
          payload: true,
        });
      });
    dispatch({ type: actiontypes.PROFILE_FETCH_LOADING, payload: false });
  };
};

export const updateUserProfile = (body) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.PROFILE_FETCH_LOADING, payload: true });
    AUTH_API.post("/updateUserDetails", body)
      .then((res) => {
        dispatch({
          type: actiontypes.SET_USER_PROFILE,
          payload: res.data,
        });
        dispatch({
          type: actiontypes.PROFILE_FETCH_FAILURE,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actiontypes.PROFILE_FETCH_FAILURE,
          payload: true,
        });
      });
    dispatch({ type: actiontypes.PROFILE_FETCH_LOADING, payload: false });
  }
}
