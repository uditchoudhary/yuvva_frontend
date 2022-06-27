import styled from "styled-components";
import BodyContainer from "../BodyContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authInstance as AUTH_API } from "../../services/axiosConfig";

const ErrorMessage = styled.span`
  color: red;
`;

const SuccessMessage = styled.span`
  color: green;
`;
const InputBox = styled.input`
  width: 30vw;
  border: none;
  border-bottom: 1px solid black;
`;

const RegisterPage = () => {
  const [isloading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
    setFocus("name");
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const onRegisterSubmit = (body) => {
    setIsLoading(true);
    AUTH_API.post(`/register`, body)
      .then((res) => {
        // dispatch(LogInOut(true));
        // navigate("/login");
        setRegisterSuccess(true);
        setRegisterError("");
        reset();
      })
      .catch((err) => {
        console.log("ERROR ", err);
        if (err.response.status === 500) {
          setRegisterError("Something went wrong");
        } else {
          setRegisterError(`Already registered. Please login.`);
        }
      });
    setIsLoading(false);
  };

  const RegisterContainer = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <div className="form-floating">
                <InputBox
                  type="name"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: "Please enter your name.",
                  })}
                />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <label htmlFor="name">Full Name</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <div className="form-floating">
                <InputBox
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Please enter your email address.",
                  })}
                />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <div className="form-floating">
                <InputBox
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="phone number"
                  {...register("phone", {
                    required: "Please enter your mobile number.",
                  })}
                />
                <ErrorMessage>{errors.phone?.message}</ErrorMessage>
                <label htmlFor="phone">Phone</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <div className="form-floating">
                <InputBox
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Please enter your password.",
                  })}
                />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-center">
              {registerError && (
                <p>
                  <ErrorMessage>{registerError}</ErrorMessage>
                </p>
              )}
              {registerSuccess && (
                <p>
                  <SuccessMessage>
                    Registration Successful. Please{" "}
                    <Link to="/login">Login</Link>{" "}
                  </SuccessMessage>
                </p>
              )}
              <button type="submit" className="btn btn-primary">
                {isloading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </form>
        <div className="row mb-3">
          <div className="col text-center">
            <span>Already Registered?</span>
            <button
              onClick={() => navigate("/login")}
              style={{ marginLeft: "20px" }}
              className="btn btn-sm btn-secondary "
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <BodyContainer>
        <h3 className="page-title">Register</h3>
        <RegisterContainer />
      </BodyContainer>
    </>
  );
};

export default RegisterPage;
