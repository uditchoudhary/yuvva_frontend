import { Link } from "react-router-dom";
import BodyContainer from "../BodyContainer";

const BrokenLink = () => {
  return (
    <>
      <BodyContainer>
        <h3 className="page-title"> Page not found </h3>
        <p>
          The page could not be found. <Link to="/">Go back</Link> to the home
          page?
        </p>
      </BodyContainer>
    </>
  );
};

export default BrokenLink;
