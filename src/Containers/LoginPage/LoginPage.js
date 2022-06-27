import styled from "styled-components";
import BodyContainer from "../BodyContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogInUser, LogOutUser } from "../../Store/Actions/UserActions";

const ErrorMessage = styled.span`
  color: red;
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const isLoading = useSelector((state) => state.userState.login_fetch_loading);
  const login_failure = useSelector(
    (state) => state.userState.login_failure_status
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "user@test.com",
      password: "password",
    },
    mode: "onChange",
  });

  const onLoginSubmit = (body) => {
    dispatch(LogInUser(body));
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const LoginContainer = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <div className="row g-3 mb-3">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Please enter email you registered with!",
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}

                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-center">
              {login_failure && (
                <p>
                  <ErrorMessage>{login_failure}</ErrorMessage>
                </p>
              )}
              <button type="submit" className="btn btn-primary">
                {isLoading ? "Loging in..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
        <div className="row mb-3">
          <div className="col text-center">
            <span>Not Registered?</span>
            <button
              className="btn btn-sm btn-secondary "
              style={{ marginLeft: "20px" }}
              onClick={handleRegisterClick}
            >
              Create Account
            </button>
          </div>
        </div>
        <p>Admin: admin@test.com / password</p>
        <p>User: user@test.com / password</p>
      </>
    );
  };

  return (
    <>
      <BodyContainer>
        <h3 className="page-title">Login</h3>
        <LoginContainer />
      </BodyContainer>
    </>
  );
};

export default LoginPage;
