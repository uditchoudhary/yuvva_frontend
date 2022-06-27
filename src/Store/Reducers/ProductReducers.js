import { LOGIN_STATUS } from "../../Utilities/Cookies/Constants";
import getCookies from "../../Utilities/Cookies/getCookies";
import * as actions from "../Actions/ActionTypes";

const ProductReducers = (state, action) => {
  switch (action.type) {
    case actions.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return { ...state, isLoggedIn: getCookies(LOGIN_STATUS) };
  }
};

export default ProductReducers;
