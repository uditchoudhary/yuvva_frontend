import { combineReducers } from "redux";
import ProductReducers from "./ProductReducers";
import UserReducers from "./UserReducers";
import CartReducer from "./CartReducer";
import OrdersReducer from "./OrdersReducer";

export default combineReducers({
  productState: ProductReducers,
  userState: UserReducers,
  cartState: CartReducer,
  orderState: OrdersReducer,
});
