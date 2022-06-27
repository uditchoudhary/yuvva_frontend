import * as actions from "../Actions/ActionTypes";

const INITIAL_STATE = {
  orders: undefined,
  order_fetch_failure: false,
  order_fetch_loading: undefined,
};

const OrdersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_ORDERS:
      return { ...state, ordersData: action.payload };
    case actions.SET_ORDERS_FAILURE:
      return { ...state, set_order_failure: action.payload };
    default:
      return { ...state };
  }
};

export default OrdersReducer;
