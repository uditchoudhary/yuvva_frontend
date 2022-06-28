import BodyContainer from "../BodyContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserProfile,
} from "../../Store/Actions/UserActions";

const ProfileRow = styled.div`
  width: 80%;
  margin: auto;
`;

const ProfileCol = styled.div`
  display: block;
  padding: 50px;
  text-align: left;
  h5 {
    margin-bottom: 50px;
    font-family: "Recoleta Alt";
    font-size: 36px;
    line-height: 44px;
    color: #4d4d4d;
  }
  &.order-history {
    text-align: right;
  }
`;

// const ErrorMessage = styled.span`
//   color: red;
// `;

const StyledPara = styled.p`
  font-size: 16px;
  color: #4d4d4d;
  width: max-content;
  &.userName {
    font-family: "Recoleta Alt";
    font-size: 18px;
    line-height: 21px;
  }
`;

const StyledButton = styled.button`
  margin: 20px 0px 20px 20px;
  border: none;
`;

const AddressFormUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    margin-left: 0;
    input {
      border: none;
      border-bottom: 1px solid black;
      &.submitButton {
        border: none;
        margin-left: 150px;
        margin-top: 10px;
      }
      &.addressEditButton {
        border: none;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
`;

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, profile_fetch_loading, user } =
    useSelector((state) => state.userState);
  const [enableAddressOption, setEnableAddressOption] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(getUserProfile());
    }
  }, []);
  // const handleUserUpdate = (body) => {
  //   dispatch(updateUserProfile(body));
  // };
  if (profile_fetch_loading) {
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
        <h3 className="page-title"> Profile page </h3>
        {user && (
          <ProfileRow className="row text-center">
            <ProfileCol className="col">
              <h5>Account Details:</h5>
              <StyledPara className="userName">{user.name}</StyledPara>
              <StyledPara>{user.email}</StyledPara>
              <StyledPara>{user.phone}</StyledPara>
              <StyledPara>{user.isAdmin && "Admin"}</StyledPara>
              {user.address && (
                !enableAddressOption ? (
                  <AddressFormUl>
                    <li>{user.address.line1}</li>
                    <li>{user.address.line2}</li>
                    <li>{user.address.line3}</li>
                    <li>
                      {user.address[0]}
                      <StyledButton
                        onClick={() => {
                          setEnableAddressOption(true);
                          // setAddressInputs({});
                        }}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit Address
                      </StyledButton>
                    </li>
                  </AddressFormUl>
                ) : (
                  <AddressFormUl>
                    <form>
                      <li>
                        <label>
                          <input
                            type="text"
                            name="line1"
                            // value={addressInputs.line1 || user.address.line1}
                            // onChange={handleAddressChange}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          <input
                            type="text"
                            name="line2"
                            // value={addressInputs.line2 || user.address.line2}
                            // onChange={handleAddressChange}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          <input
                            type="text"
                            name="line3"
                            // value={addressInputs.line3 || user.address.line3}
                            // onChange={handleAddressChange}
                          />
                        </label>
                      </li>
                      <li>
                        <input
                          type="button"
                          value="Submit"
                          className="addressEditButton"
                          // onClick={(event) =>
                          //   handleAddress(event, {
                          //     address: {
                          //       line1: addressInputs.line1,
                          //       line2: addressInputs.line2,
                          //       line3: addressInputs.line3,
                          //     },
                          //   })
                          // }
                        />
                        <input
                          type="button"
                          value="Cancel"
                          className="addressEditButton"
                          onClick={() => setEnableAddressOption(false)}
                        />
                      </li>
                    </form>
                  </AddressFormUl>
                )
              )}
              <StyledButton
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#updateDetailsModal"
              >
                Update Details
              </StyledButton>


            </ProfileCol>
          </ProfileRow>
        )}
      </BodyContainer>
    </>
  );
};

export default UserProfilePage;
