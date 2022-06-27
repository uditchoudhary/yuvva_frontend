import { Cookies } from "react-cookie";

const getCookies = (cookieName) => {
    var cookies = new Cookies();
    
  return cookies.get(cookieName) || false;
};

export default getCookies;
