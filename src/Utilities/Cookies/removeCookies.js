import { Cookies } from "react-cookie";

const removeCookies = (cookieName) => {
  var cookies = new Cookies();
  return cookies.remove(cookieName);
};

export default removeCookies;
