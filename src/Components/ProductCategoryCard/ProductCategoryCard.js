import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import BodyContainer from "../../Containers/BodyContainer";
import ProductCard from "../ProductCard";
import { instance as API } from "../../services/axiosConfig";

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  border: 0.1px solid black;
`;

const ProductCategoryCard = ({ productCategory }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState({});
  const [productCategoryItems, setProductCategoryItems] = useState();

  useEffect(() => {
    setIsloading(true);
    API.get(
      `${process.env.REACT_APP_API}/products/${productCategory.productCategory_id}`
    ).then((res) => {
      setProductCategoryItems(res.data);
      setIsloading(false);
    });
  }, []);

  const {
    _id,
    category_id,
    category_name,
    productCategory_id,
    productCategory_name,
    productCategory_description,
    productCategory_images,
  } = productCategory;
  return (
    <BodyContainer>
      <Wrapper>
        <h4 className="text-lefy">{productCategory_name}</h4>
      </Wrapper>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {productCategoryItems?.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </BodyContainer>
  );
};

export default ProductCategoryCard;
