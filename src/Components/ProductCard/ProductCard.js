import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/Actions/CartActions";

const CardLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const CardPrice = styled.div`
  margin-top: 7px;
  color: #569ea2;
`;

const CardWrapper = styled.div`
  min-width: 20vw;
  font-family: "DIN Neuzeit Grotesk", sans-serif;
  padding: 20px;
  text-align: center;
  &:hover {
    border: 0;
    box-shadow: 6px 7px 18px 3px rgba(0, 0, 0, 0.43);
    -webkit-box-shadow: 6px 7px 18px 3px rgba(0, 0, 0, 0.43);
    -moz-box-shadow: 6px 7px 18px 3px rgba(0, 0, 0, 0.43);
  }
`;

const CardCategory = styled.div`
  margin-top: 25px;
  font-size: 13px;
  line-height: 21px;
  letter-spacing: 3px;
`;

const CardButton = styled.button`
  position: relative;
  border: none;
  transition: 0.4s ease-in;
  z-index: 1;
  width: 100%;
  height: 30px;
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
    box-shadow: inset -32em 0 0 0 #fcc7b7, inset 32.5em 0 0 0 #fcc7b7;
  }
`;

const StyledImage = styled.img`
  width: auto;
  height: 200px;
`;

const SizeDropdown = styled.select`
  width: 80px;
  margin-left: 5px;
  width: max-content;
`;

const SizeMlSpan = styled.span`
  margin-left: 2px;
  margin-right: 2px;
`;

const handleOnClick = (item) => {};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const {
    item_images,
    item_size_price_ml,
    item_name,
    category_name,
    item_id,
    _id,
    productCategory_name,
  } = product;

  const item = {
    item_id,
    category_name,
    item_name,
    productCategory_name,
    size: item_size_price_ml[0].size,
    price: item_size_price_ml[0].price,
    quantity: 1,
    _id,
    image: item_images[0].image_url,
  };
  const handleOnClick = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <CardWrapper>
      <>
        <CardLink to={`/product/${item_id}/details`}>
          <div className="card-image d-flex justify-content-center">
            <StyledImage
              src={item_images[0][Object.keys(item_images[0])[0]]}
              alt={item_images[0][Object.keys(item_images[0])[1]]}
            />
          </div>
          <CardCategory className="d-flex justify-content-center my-2">
            {category_name}
          </CardCategory>
          <div className="card-name  d-flex justify-content-center ">
            {item_name}
          </div>
          <div className="d-flex justify-content-center">
            <SizeMlSpan> Size: </SizeMlSpan>
            <div style={{ marginLeft: "5px" }}>
              {item_size_price_ml[0].size}
            </div>
            <SizeMlSpan>ml</SizeMlSpan>
          </div>
          <CardPrice>&#x20B9; {item_size_price_ml[0].price}</CardPrice>
        </CardLink>
        <div className="card-cart d-flex justify-content-center mt-3 ">
          <CardButton
            onClick={() =>
              handleOnClick({
                item: {
                  item_id,
                  category_name,
                  item_name,
                  productCategory_name,
                  size: item_size_price_ml[0].size,
                  price: item_size_price_ml[0].price,
                  quantity: 1,
                  _id,
                  image: item_images[0].image_url,
                },
              })
            }
          >
            Add to Cart
          </CardButton>
        </div>
      </>
    </CardWrapper>
  );
};

export default ProductCard;
