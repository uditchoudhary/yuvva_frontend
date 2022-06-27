import { useEffect } from "react";
import styled from "styled-components";
import { device } from "../../styles/devices";

const Container = styled.div`
  width: 80vw;
  // min-height: 55vh;
  height: auto;
  // height: 61vh;
  // background-color: #b60c2040;
  padding-top: 2em;
  padding-bottom: 4em;
  @media ${device.mobile} {
    width: 100vw;
  }
  @media ${device.tablet} {
    width: 100vw;
  }
  & .page-title {
    text-align: center;
    color: #b60c20;
  }
  .spinner {
    text-align: center;
    margin-top: 4em;
  }
`;

const BodyContainer = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Container className="container-fluid">
        <div className="justify-content-center">{children}</div>
      </Container>
    </>
  );
};

export default BodyContainer;
