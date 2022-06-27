import { LOGIN_STATUS } from "../../Utilities/Cookies/Constants";
import getCookies from "../../Utilities/Cookies/getCookies";
import removeCookies from "../../Utilities/Cookies/removeCookies";
import setCookies from "../../Utilities/Cookies/setCookies";
import * as actions from "../Actions/ActionTypes";

const UserReducers = (state, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      setCookies(LOGIN_STATUS, true);
      return { ...state, isLoggedIn: true };
    case actions.LOG_OUT:
      removeCookies(LOGIN_STATUS);
      return { ...state, isLoggedIn: false };
    case actions.LOGIN_FAILURE_STATUS:
      return {
        ...state,
        login_failure_status: action.payload,
      };
    case actions.LOGIN_FETCH_LOADING:
      return {
        ...state,
        login_fetch_loading: action.payload,
      };
    default:
      return { ...state, isLoggedIn: getCookies(LOGIN_STATUS) };
  }
};

export default UserReducers;
