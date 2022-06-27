import { useEffect, useState } from "react";
import BodyContainer from "../../BodyContainer";
import axios from "axios";
import styled from "styled-components";

import ProductCategoryCard from "../../../Components/ProductCategoryCard/ProductCategoryCard";

const KombuchaGreet = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 20vh;
  position: relative;
  font-family: Gilroy;
  margin-top: -60px;
`;

const Probiotics = () => {
  const [proboiticsProducts, setProbioticsProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    axios.get(`${process.env.REACT_APP_API}/probiotics`).then((res) => {
      setProbioticsProducts(res.data);
      setIsloading(false);
    });
  }, []);
  return (
    <>
      <BodyContainer>
        <KombuchaGreet className="d-flex flex-column align-items-center justify-content-center">
          <h2>YUUVA KOMBUCHA</h2>
          <h4>Proudly Brewed in Delhi, India</h4>
        </KombuchaGreet>
        {isLoading ? (
          <div className="spinner">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div className="">
            {proboiticsProducts.map((proboiticsProduct) => {
              return (
                <div key={proboiticsProduct._id} className="">
                  <ProductCategoryCard productCategory={proboiticsProduct} />
                </div>
              );
            })}
          </div>
        )}
      </BodyContainer>
    </>
  );
};

export default Probiotics;
