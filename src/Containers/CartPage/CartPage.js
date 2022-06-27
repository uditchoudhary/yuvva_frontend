import BodyContainer from "../BodyContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCart,
  getCartData,
  updateCart,
  removeItemFromCart,
} from "../../Store/Actions/CartActions";
import CartProductCard from "./CartProductCard";
import styled from "styled-components";
import { device } from "../../styles/devices";
import CheckoutComponent from "../../Components/CheckoutComponent";

const ParentContainer = styled.div`
  display: flex;
  padding-top: 20px;
  @media ${device.laptop} {
    padding: 20px 0px;
  }
  @media ${device.tablet} {
    padding: 20px 0px;
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const ProductWrapper = styled.div`
  flex: 3;
`;
const TotalItemsAndCostWrapper = styled.div`
  border: 1px solid #b60c20;
  max-height: 50px;
  padding: 10px;
  display: flex;
  flex: 1;
  margin-top: 30px;
`;
const TotalCost = styled.div`
  flex: 1;
  text-align: right;
`;
const TotalText = styled.div`
  flex: 2;
  text-align: center;
`;
const TotalItems = styled.div`
  flex: 1;
  text-align: right;
`;

const WrapperBottom = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const EmptyCart = styled.button`
  width: max-content;
`;
const PrimaryCheckout = styled.button`
  width: max-content;
`;
const DeleteCartIconText = styled.span``;
const DeleteCartIcon = styled.svg``;
const RightContainer = styled.div`
  border-left: 0.1px solid green;
  flex: 1;
  padding: 20px;
  transition: ease-in-out;
`;
const ContinueShopping = styled.button``;
const EmptyCartDisplay = styled.div`
  // border: 0.1px solid black;
  min-height: 30vh;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const EmptyCartIcon = styled.div``;
const EmptyCartText = styled.div``;

const CartPage = () => {
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const cartData = useSelector((state) => state.cartState.cartData);
  const cartTotalItems = useSelector((state) => state.cartState.cartTotalItems);
  const cartTotalCost = useSelector((state) => state.cartState.cartTotalCost);
  const cartFetchLoading = useSelector(
    (state) => state.cartState.cartFetchLoading
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    dispatch(getCartData());
  }, [isLoggedIn, navigate]);

  const handleRemoveItemFromCart = (body) => {
    dispatch(removeItemFromCart(body));
  };
  const handleDeleteCart = () => {
    dispatch(deleteCart());
  };
  const handleStartShopClick = () => {
    navigate("/products/all");
  };
  const handleQuantityChange = ({ quantity, item_id, price }) => {
    dispatch(updateCart({ quantity, item_id, price }));
  };

  if (cartFetchLoading) {
    return (
      <BodyContainer>
        <div className="spinner">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      </BodyContainer>
    );
  }
  return (
    <>
      <BodyContainer>
        <h3 className="page-title"> SHOPPING CART </h3>
        <div className="row">
          {cartData?.itemList?.length > 0 ? (
            <ParentContainer>
              <LeftContainer>
                <ProductWrapper>
                  {cartData.itemList.map((cartItem) => {
                    return (
                      <CartProductCard
                        key={cartItem._id}
                        cartItem={cartItem}
                        onRemoveItemFromCart={() =>
                          handleRemoveItemFromCart({
                            _id: cartItem._id,
                            price: cartItem.price,
                            quantity: cartItem.quantity,
                          })
                        }
                        onQuantityChange={(props) =>
                          handleQuantityChange(props)
                        }
                      />
                    );
                  })}
                </ProductWrapper>
                <TotalItemsAndCostWrapper>
                  <TotalText>Total</TotalText>
                  <TotalItems>Quantity: {cartTotalItems}</TotalItems>
                  <TotalCost>&#x20B9; {cartTotalCost}</TotalCost>
                </TotalItemsAndCostWrapper>
                <WrapperBottom>
                  <EmptyCart className="btn btn-danger btn-sm">
                    <DeleteCartIcon
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </DeleteCartIcon>
                    <DeleteCartIconText onClick={() => handleDeleteCart()}>
                      Clear Cart
                    </DeleteCartIconText>
                  </EmptyCart>
                  <ContinueShopping
                    className="btn btn-secondary"
                    onClick={() => navigate("/products/all")}
                  >
                    Continue Shopping
                  </ContinueShopping>
                  <PrimaryCheckout
                    className="btn btn-success btn-sm"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCheckout"
                    aria-expanded="false"
                    aria-controls="collapseCheckout"
                  >
                    Checkout
                  </PrimaryCheckout>
                </WrapperBottom>
              </LeftContainer>
              <RightContainer
                className="collapse collapse-horizontal"
                id="collapseCheckout"
              >
                <CheckoutComponent />
              </RightContainer>
            </ParentContainer>
          ) : (
            <EmptyCartDisplay>
              <EmptyCartIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </EmptyCartIcon>
              <EmptyCartText>Your Cart Is Currently Empty</EmptyCartText>
              <button
                className="btn btn-primary mt-4"
                onClick={() => handleStartShopClick()}
              >
                Start Shopping
              </button>
            </EmptyCartDisplay>
          )}
        </div>
      </BodyContainer>
    </>
  );
};

export default CartPage;
