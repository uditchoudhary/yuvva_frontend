import BodyContainer from "../BodyContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { updateOrder, getOrders } from "../../Store/Actions/OrderActions";
import { deleteCart } from "../../Store/Actions/CartActions";
import styled from "styled-components";


const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ViewOrders = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const orders = useSelector((state) => state.orderState.ordersData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    const orderStatus = searchParams.get("status");
    const orderid = searchParams.get("orderid");
    const date = searchParams.get("date");
    const bank = searchParams.get("bank");
    if (orderStatus && orderid && date && bank) {
      dispatch(updateOrder({ orderStatus, orderid, date, bank }));
      dispatch(deleteCart());
      navigate("/viewOrders");
    }
    dispatch(getOrders());
  }, []);
  return (
    <BodyContainer>
      <h3 className="page-title"> Order History </h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr
                  className={
                    order.txnStatus === "TXN_SUCCESS"
                      ? "table-success"
                      : "table-danger"
                  }
                >
                  <th scope="row">{order.orderId}</th>
                  <td>
                    <StyledUl>
                      {order.orderItem.map((item) => {
                        return <li>{item.item_name}</li>;
                      })}
                    </StyledUl>
                  </td>
                  <td>&#x20B9;{order.orderTotal}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.txnStatus}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </BodyContainer>
  );
};

export default ViewOrders;
