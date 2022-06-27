import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import logo from "../../static/images/yuvva_logo_small.jpg";
import { device } from "../../styles/devices";
import { useSelector, useDispatch } from "react-redux";
import { LogOutUser } from "../../Store/Actions/UserActions";
import { getCartData } from "../../Store/Actions/CartActions";

const NavbarWrapper = styled.div`
  width: 80vw;
  border-bottom: 0.2px solid rgba(185, 89, 89, 0.536);
  transition: 0.5s;
  & .dropdown-menu {
    border: none;
  }
  @media ${device.mobile} {
    width: 100vw;
  }
  @media ${device.tablet} {
    width: 100vw;
  }
`;

const NavBarLogo = styled.img`
  width: 80px;
  height: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  &:hover {
    border-bottom: 0.2px solid black;
    color: #b60c20;
  }
`;

const NavigationBar = () => {
  const navBarRef = useRef(null);
  const dispatch = useDispatch();
  const cartTotalItems = useSelector((state) => state.cartState.cartTotalItems);
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);


  const onLogout = () => {
    dispatch(LogOutUser());
  };

  const onScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      navBarRef.current.style.background = "#ffffff";
    } else {
      navBarRef.current.style.background = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCartData());
  }, [isLoggedIn]);

  return (
    <>
      <NavbarWrapper
        className="container-fluid sticky-top"
        id="navbar"
        ref={navBarRef}
      >
        <div className="justify-content-center">
          <nav className="navbar navbar-expand-lg d-flex">
            <Link className="navbar-brand me-auto" to="/">
              <NavBarLogo src={logo} alt="Logo" className="yuuva-logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <span className="navbar-toggler-icon"></span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="ms-auto navbar-nav pe-3">
                <li className="nav-item dropdown">
                  <StyledLink
                    className="nav-link ms-3 dropdown-toggle"
                    aria-current="page"
                    to="/probiotics"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Probiotics
                  </StyledLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to="/products/probiotics/kombucha"
                    >
                      Kombucha
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/products/probiotics/kefir"
                    >
                      Kefir
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/products/probiotics/sauerkraut"
                    >
                      Sauerkraut
                    </Link>
                    <div className="dropdown-divider"></div>
                    <StyledLink className="dropdown-item" to="/probiotics">
                      Explore All
                    </StyledLink>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <StyledLink
                    className="nav-link dropdown-toggle nav-item ms-3 "
                    to="/organics"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    Organics
                  </StyledLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to="/products/organics/millets"
                    >
                      Gluten Free Millets
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/products/organics/cold-pressed-oil"
                    >
                      Cold Pressed Oil
                    </Link>
                    <div className="dropdown-divider"></div>
                    <StyledLink className="dropdown-item" to="/organics">
                      Explore All
                    </StyledLink>
                  </ul>
                </li>
                <li className="nav-item">
                  <StyledLink className="nav-link nav-item ms-3" to="/aboutus">
                    Our Roots
                  </StyledLink>
                </li>
                <li className="nav-item">
                  <StyledLink
                    className="nav-link nav-item ms-3"
                    to="/contactus"
                  >
                    Contact Us
                  </StyledLink>
                </li>
                <li className="nav-item dropdown">
                  {isLoggedIn ? (
                    <div>
                      <StyledLink
                        className="nav-link ms-3 dropdown-toggle"
                        aria-current="page"
                        to="/profile"
                        role="button"
                        data-bs-toggle="dropdown"
                      >
                        Profile
                      </StyledLink>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                        <Link className="dropdown-item" to="/viewOrders">
                          View Orders
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={onLogout}
                        >
                          Log out
                        </Link>
                      </ul>
                    </div>
                  ) : (
                    <StyledLink className="nav-link nav-item ms-3" to="/login">
                      Log in
                    </StyledLink>
                  )}
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <StyledLink className="nav-link nav-item ms-3" to="/cart">
                      Cart ({cartTotalItems || 0})
                    </StyledLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </NavbarWrapper>
    </>
  );
};

export default NavigationBar;
