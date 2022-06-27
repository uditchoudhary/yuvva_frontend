import { authInstance as AUTH_API } from "../../services/axiosConfig";
import {
  SET_ORDERS,
  SET_ORDERS_FAILURE,
  UPDATE_ORDERS_FAILURE,
} from "./ActionTypes";

export const addOrders = (body) => {
  console.log("Creating Order -> ", body);
  return async (dispatch) => {
    try {
      const res = await AUTH_API.post(`/addorder`, body);
      // dispatch({
      //   type: SET_ORDERS,
      //   payload: res.data,
      // });
    } catch (e) {
      // dispatch({
      //   type: SET_ORDERS_FAILURE,
      //   payload: e,
      // });
    }
  };
};

export const updateOrder = (body) => {
  console.log("Updating order -> ", body);
  return async (dispatch) => {
    try {
      const res = await AUTH_API.post(`/updateOrder`, body);
      // dispatch({
      //   type: SET_ORDERS,
      //   payload: res.data,
      // });
    } catch (e) {
      dispatch({
        type: UPDATE_ORDERS_FAILURE,
        payload: e,
      });
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await AUTH_API.get(`/getOrders`);
      console.log(res.data)
      dispatch({
        type: SET_ORDERS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: SET_ORDERS_FAILURE,
        payload: e,
      });
    }
  };
};
