// import { useDispatch } from "react-redux";
import styled from "styled-components";
// import { setCartData } from "../Store/Actions/CartActions";
import { device } from "../styles/devices";

import { authInstance as AUTH_API } from "./axiosConfig";

const CardButton = styled.button`
  border: none;
  transition: 0.4s ease-in;
  z-index: 1;
  width: 80%;
  height: 30px;
  margin-top: 100px;
  @media ${device.tablet} {
    margin-top: 50px;
  }
  &:before {
    position: absolute;
    content: "";
    z-index: -1;
  }
  &:after {
    position: absolute;
    content: "";
    z-index: -1;
  }
  &:hover {
    box-shadow: inset -25em 0 0 0 #fcc7b7, inset 25.5em 0 0 0 #fcc7b7;
  }
`;

const HandleAddToCartOnClick = (item) => {
  AUTH_API.post(`/cartadditem`, { item })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const AddToCartService = ({ item }) => {
  return (
    <CardButton onClick={() => HandleAddToCartOnClick(item)}>
      Add to Cart
    </CardButton>
  );
};

export default AddToCartService;
