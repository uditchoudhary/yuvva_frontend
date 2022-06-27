import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BodyContainer from "../../Containers/BodyContainer";
import { instance as API } from "../../services/axiosConfig";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { device } from "../../styles/devices";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/Actions/CartActions";
const LeftContainer = styled.div`
  padding: 40px;
`;
const RightContainer = styled.div`
  // height: 50vh;
  padding: 40px;
`;

const ProductDetailsPageWrapper = styled.div`
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const CarouselImage = styled.img`
  max-width: 150px;
  height: auto;
  @media ${device.tablet} {
    max-width: 20%;
  }
`;

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

const ProductDetails = () => {
  const params = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [fetchError, setFetchError] = useState("");
  const productId = params.id;
  const [quantity, setQuanity] = useState(1);
  const dispatch = useDispatch();
  const {
    item_name,
    item_images,
    productCategory_name,
    category_name,
    item_description,
    item_size_price_ml,
    item_id,
    _id,
  } = productDetails;

  const handleOnClick = (item) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    setIsloading(true);
    API.get(`/items/${productId}`)
      .then((res) => {
        setProductDetails(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        setFetchError(err);
        setIsloading(false);
      });
  }, []);
  if (isLoading) {
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
    <BodyContainer>
      {fetchError ? (
        <h5>Something went wrong...</h5>
      ) : (
        <ProductDetailsPageWrapper className="row">
          <LeftContainer className="col">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              interval={5000}
              showStatus={false}
              showIndicators={false}
            >
              {item_images.map((item) => {
                return (
                  <div>
                    <CarouselImage src={item_images[0].image_url} />
                  </div>
                );
              })}
              {/* <div>
                <CarouselImage src={item_images[0].image_url} />
              </div> */}
            </Carousel>
          </LeftContainer>
          <RightContainer className="col">
            <div className="row">
              <div
                className="col"
                style={{
                  fontSize: "32px",
                  lineHeight: "46px",
                  textAlign: "start",
                  color: "#4a4a4a",
                }}
              >
                <p>
                  {productCategory_name}{" "}
                  <span
                    style={{
                      color: item_name === "Orange" ? "orange" : "#e3374b",
                      fontSize: "30px",
                    }}
                  >
                    {item_name}
                  </span>
                </p>
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{
                  fontSize: "20px",
                  lineHeight: "46px",
                  textAlign: "start",
                  color: "#4a4a4a",
                }}
              >
                {category_name}{" "}
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{
                  marginTop: "20px",
                }}
              >
                {item_description}
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{
                  marginTop: "20px",
                }}
              >
                Price: &#x20B9; {item_size_price_ml[0].price} for{" "}
                {item_size_price_ml[0].size} ml bottle
              </div>
              <div className="row">
                <div
                  className="col"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Quantity:
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuanity(e.target.value)}
                    min={1}
                    style={{
                      marginLeft: "20px",
                      width: "50px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
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
                        quantity: quantity,
                        _id,
                        image: item_images[0].image_url,
                      },
                    })
                  }
                >
                  Add to Cart
                </CardButton>
              </div>
            </div>
          </RightContainer>
        </ProductDetailsPageWrapper>
      )}
    </BodyContainer>
  );
};

export default ProductDetails;
