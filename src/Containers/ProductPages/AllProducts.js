import { useEffect, useState } from "react";
import BodyContainer from "../BodyContainer";
import { instance as API } from "../../services/axiosConfig";
import ProductCard from "../../Components/ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    API.get("/items")
      .then((res) => {
        setProducts(res.data);
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
          <h3 className="page-title"> Profile page </h3>

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
        <h3 className="page-title">All Products</h3>
        <div className=" d-flex justify-content-around flex-wrap p-3">
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </BodyContainer>
    </>
  );
};

export default AllProducts;
