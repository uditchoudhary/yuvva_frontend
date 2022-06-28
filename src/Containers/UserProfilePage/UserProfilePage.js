import BodyContainer from "../BodyContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getUserProfile } from "../../Store/Actions/UserActions";

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
  const { isLoggedIn, profile_fetch_loading, user } = useSelector(
    (state) => state.userState
  );
  const handleUserUpdate = (event) => {
 
  };
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
                <AddressFormUl>
                  <li>{user.address.line1}</li>
                  <li>{user.address.line2}</li>
                  <li>{user.address.line3}</li>
                </AddressFormUl>
              )}
              <StyledButton
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#updateDetailsModal"
              >
                Update Details
              </StyledButton>
              <div
                className="modal fade"
                id="updateDetailsModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="updateDetailsModalTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="page-title">Update Details</h4>
                      <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleUserUpdate}>
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="What's your full name?"
                              />
                              <label htmlFor="name">Full Name</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={user.email}
                                disabled={true}
                              />
                              <label htmlFor="email">Email address</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="phone"
                                className="form-control"
                                id="phone"
                              />
                              <label htmlFor="phone">Phone</label>
                            </div>
                          </div>
                        </div>
                        Addres:
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="line1"
                                className="form-control"
                                id="line1"
                              />
                              <label htmlFor="line1">address Line 1</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="line2"
                                className="form-control"
                                id="line2"
                              />
                              <label htmlFor="line2">address Line 2</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md">
                            <div className="form-floating">
                              <input
                                type="line3"
                                className="form-control"
                                id="line3"
                              />
                              <label htmlFor="line3">address Line 3</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col text-center">
                            <div className="modal-footer">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                // onClick={handleUserUpdate}
                              >
                                Save Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </ProfileCol>
          </ProfileRow>
        )}
      </BodyContainer>
    </>
  );
};

export default UserProfilePage;
