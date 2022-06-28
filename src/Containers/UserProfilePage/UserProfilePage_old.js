import BodyContainer from "../BodyContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authInstance as AUTH_API } from "../../services/axiosConfig";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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

const ErrorMessage = styled.span`
  color: red;
`;

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
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const [userProfileError, setUserProfileError] = useState();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

  const [isAddress, setIsAddress] = useState(false);
  const [enableAddressOption, setEnableAddressOption] = useState(false);
  const [addressInputs, setAddressInputs] = useState({});

  const setDataAddressToState = ({ line1, line2, line3 }) => {
    setAddressInputs((values) => ({ ...values, line1: line1 }));
    setAddressInputs((values) => ({ ...values, line2: line2 }));
    setAddressInputs((values) => ({ ...values, line2: line3 }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    if (!isLoggedIn) {
      navigate("/login");
    }
    AUTH_API.get(`/profile`)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
        if (res.data.address) {
          setIsAddress(true);
          setDataAddressToState(res.data.address);
        }
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.response.status === 404) {
          setUserProfileError("User not valid. Login please");
        } else {
          setUserProfileError("Oooops...!!! Something Went Wrong");
        }
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      line1: user.line1,
      line2: user.line2,
      line3: user.line3,
    },
    mode: "onChange",
  });

  const handleAddressChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddressInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAddress = (e, body) => {
    e.preventDefault();
    AUTH_API.post(`/updateAddress`, body)
      .then((res) => {
        setUser(res.data);
        if (res.data.address) {
          setIsAddress(true);
          setDataAddressToState(res.data.address);
          setAddressInputs({});
        }
        setEnableAddressOption(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setUserProfileError("User not valid. Login please");
        } else {
          setUserProfileError("Oooops...!!! Something Went Wrong");
        }
        setEnableAddressOption(false);
      });
  };

  const handleUserUpdate = (body) => {

    AUTH_API.post(`/updateUserDetails`, body)
      .then((res) => {
        setUser(res.data);
        setIsAddress(true);
        setEnableAddressOption(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setUserProfileError("User not valid. Login please");
        } else {
          setUserProfileError("Oooops...!!! Something Went Wrong");
        }
        setEnableAddressOption(false);
      });
  };

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
        <h3 className="page-title"> My Profile </h3>
        {userProfileError && <p>{userProfileError}</p>}
        {user && (
          <>
            <ProfileRow className="row text-center">
              <ProfileCol className="col">
                <h5>Account Details:</h5>
                <StyledPara className="userName">{user.name}</StyledPara>
                <StyledPara>{user.email}</StyledPara>
                <StyledPara>{user.phone}</StyledPara>
                <StyledPara>{user.isAdmin && "Admin"}</StyledPara>
                {isAddress ? (
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
                            setAddressInputs({});
                          }}
                          className="btn btn-sm btn-secondary"
                        >
                          Edit
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
                              value={addressInputs.line1 || user.address.line1}
                              onChange={handleAddressChange}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            <input
                              type="text"
                              name="line2"
                              value={addressInputs.line2 || user.address.line2}
                              onChange={handleAddressChange}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            <input
                              type="text"
                              name="line3"
                              value={addressInputs.line3 || user.address.line3}
                              onChange={handleAddressChange}
                            />
                          </label>
                        </li>
                        <li>
                          <input
                            type="button"
                            value="Submit"
                            className="addressEditButton"
                            onClick={(event) =>
                              handleAddress(event, {
                                address: {
                                  line1: addressInputs.line1,
                                  line2: addressInputs.line2,
                                  line3: addressInputs.line3,
                                },
                              })
                            }
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
                ) : (
                  <>Add Address</>
                )}

                {/* <StyledButton
                  className="btn btn-secondary btn-sm"
                  onClick={(event) =>
                    handleAddress(event, {
                      address: {
                        line1: "some address 1",
                        line2: "Some address 2",
                        line3: "some address 3",
                      },
                    })
                  }
                >
                  auto
                </StyledButton> */}
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
                        <form onSubmit={handleSubmit(handleUserUpdate)}>
                          <div className="row mb-3">
                            <div className="col-md">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  placeholder="What's your full name?"
                                  {...register("name", {
                                    required: "Please enter your full name",
                                    minLength: {
                                      value: 4,
                                      message:
                                        "Please use 4 characters or more",
                                    },
                                    maxLength: {
                                      value: 30,
                                      message:
                                        "Please use 30 characters or less",
                                    },
                                  })}
                                />
                                {errors.name && (
                                  <ErrorMessage>
                                    {errors.name.message}
                                  </ErrorMessage>
                                )}
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
                                  {...register("email", {
                                    required: false,
                                  })}
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
                                  {...register("phone", {
                                    required: "Please enter mobile number",
                                  })}
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
                                  {...register("line1", {
                                    required: false,
                                  })}
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
                                  {...register("line2", {
                                    required: "Please enter your full name",
                                  })}
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
                                  {...register("line3", {
                                    required: "Please enter your full name",
                                  })}
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
              <ProfileCol className="col order-history">
                Order History
              </ProfileCol>
            </ProfileRow>
          </>
        )}
      </BodyContainer>
    </>
  );
};

export default UserProfilePage;
