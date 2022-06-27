import { authInstance as AUTH_API } from "../../services/axiosConfig";
import * as actionTypes from "./ActionTypes";

const setCartData = (res) => {
  const totalItems = res.data?.itemList?.reduce(
    (previous, object) => previous + object.quantity,
    0
  );
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CART_DATA,
      payload: res.data,
    });
    dispatch({
      type: actionTypes.SET_CART_TOTAL_COST,
      payload: res.data.total,
    });
    dispatch({
      type: actionTypes.SET_CART_TOTAL_ITEMS,
      payload: totalItems,
    });
  };
};

export const getCartData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CART_FETCH_LOADING,
      payload: true,
    });
    await AUTH_API.get(`/cart`)
      .then((res) => {
        dispatch(setCartData(res));
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.CART_FETCH_FAILURE,
          payload: err,
        });
      });
    dispatch({
      type: actionTypes.CART_FETCH_LOADING,
      payload: false,
    });
  };
};

export const addToCart = (item) => {
  return async (dispatch) => {
    await AUTH_API.post(`/cartadditem`, item)
      .then((res) => {
        dispatch(setCartData(res));
      })
      .catch((err) => {
        if (err.response.status === 404)
          return alert("Please lgoin before adding item to cart");
        alert("Failed to add item to the cart");
      });
  };
};

export const removeItemFromCart = (body) => {
  return async (dispatch) => {
    await AUTH_API.post(`/cartremoveitem`, body)
      .then((res) => {
        dispatch(setCartData(res));
      })
      .catch((err) => alert("failed to add to the cart"));
  };
};

export const deleteCart = () => {
  return async (dispatch) => {
    await AUTH_API.post("/deleteCart")
      .then((res) => {
        dispatch(setCartData(res));
      })
      .catch((err) => alert("Card delete failed"));
  };
};

export const updateCart = (item) => {
  return async (dispatch) => {
    console.log("Updating cart with values: ", item);
    await AUTH_API.post("/cartupdateitem", item)
      .then((res) => {
        dispatch(setCartData(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
