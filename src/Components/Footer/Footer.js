import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../static/images/yuvva_logo_small.jpg";
import { device } from "../../styles/devices";
import ReactWhatsapp from "react-whatsapp";
import whatsappGif from "../../static/images/whatsapp.gif";
import callIcon from "../../static/images/callIcon.png";

const FooterWrapper = styled.div`
  height: auto;
  width: 80vw;
  border-top: 0.1px solid #b60c2040;
  & .footer-logo {
    // @media (max-width: 800px) {
    @media ${device.tablet} {
      display: none;
    }
    @media ${device.laptopL} {
      margin-left: 45px;
      margin-top: 45px;
    }
  }
  @media ${device.mobile} {
    width: 100vw;
  }
  @media ${device.tablet} {
    width: 100vw;
  }
`;

const Copyright = styled.div`
  height: auto;
  background-color: #b60c20;
  font-wight: 300;
  color: white;
  font-family: "Open Sans", sans-serif;
  line-heigt: 14px;
  text-align: center;
  align-item: center;
`;

const FooterSection = styled.div`
  height: auto;
  & > div > .footer-logo-text {
    text-decoration: none;
    color: #b60c20;
  }
`;

const ImportantLinks = styled.div`
  border: 0.1px solid #b60c20;
  @media ${device.mobile} {
    font-size: 14px;
  }
  & > div {
    text-align: center;
  }
`;

const FooterCols = styled.div`
  padding: 2em;
  & a {
    text-decoration: none;
    color: black;
  }
  & > div > ul {
    list-style-type: none;
    padding-left: 0rem;
    @media ${device.mobile} {
      font-size: 14px;
    }
  }
  & > div > .footer-menu-title {
    font-weight: 500;
    margin: 0;
    letter-spacing: 3px;
    @media ${device.mobile} {
      letter-spacing: 1px;
      padding-top: 5px;
      font-size: 14px;
    }
  }
  & > div > hr {
    width: 50%;
  }
  & .social-icons-wrapper {
    margin-top: 20px;
  }
  & .social-icons {
    width: 22px;
    height: 22px;
  }
  & .footer-icon {
    width: 30px;
    height: auto;
  }
  @media ${device.mobile} {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    color: #b60c20;
  }
`;

const StyledWhatsapp = styled(ReactWhatsapp)`
  border: none;
  background: none;
  padding: 0;
`;

const FooterLogo = styled.img`
  max-width: 150px;
  height: auto;
`;

const Footer = () => {
  return (
    <>
      <FooterWrapper className="container-fluid" id="footerBar">
        <div className="justify-content-center">
          <FooterSection className="row">
            <div className="col p-5 footer-logo">
              <a href="/">
                <FooterLogo src={logo} alt="Logo" />
              </a>
              <div className="footer-logo-text">Indian Kefir Company</div>
            </div>
            <FooterCols className="col footer-menu-col">
              <div>
                <div className="footer-menu-title">ALL CATEGORIES</div>
                <hr />
                <ul>
                  <li>
                    <StyledLink to="/products/probiotics/kombucha">
                      Kombucha
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/products/probiotics/kefir">
                      Kefir
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/products/probiotics/sauerkraut">
                      Sauerkraut
                    </StyledLink>
                  </li>

                  <li>
                    <StyledLink to="/products/organics/millets">
                      Gluten Free Millets
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/products/organics/cold-pressed-oil">
                      Cold Pressed Oil
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/products/all">Shop all</StyledLink>
                  </li>
                </ul>
              </div>
            </FooterCols>
            <FooterCols className="col">
              <div>
                <div className="footer-menu-title">CONTACT US</div>
                <hr />
                <ul>
                  <li>
                    <a href="tel:+919654123377">
                      Call Us{" "}
                      <img
                        src={callIcon}
                        className="footer-icon"
                        alt="call us"
                      />
                    </a>
                  </li>
                  <StyledWhatsapp
                    number="+919654123377"
                    message="Hello Indian Kefir Company"
                  >
                    WhatsApp Us{" "}
                    <img
                      src={whatsappGif}
                      alt="whatsapp"
                      className="footer-icon"
                    />
                  </StyledWhatsapp>
                </ul>
              </div>
              <div className="social-icons-wrapper">
                <div className="footer-menu-title">CONNECT US AT:</div>
                <hr />
                <ul className="ul-float-left">
                  <li>
                    <div className="row row-cols-auto">
                      <a
                        href="https://www.facebook.com/kefirgrainsindelhincr/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-facebook col social-icons"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/indian_kefir_company/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-instagram col social-icons"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UC8alPlfpr2yv-Qw8Y0WuEng?sub_confirmation=1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-youtube col social-icons"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                        </svg>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </FooterCols>
          </FooterSection>
          <ImportantLinks className="row row-cols-1 row-cols-md-4 imp-links">
            <div className="footer-about-us col">
              <StyledLink to="/aboutus">About Us</StyledLink>
            </div>

            <div className="footer-about-us col">
              <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
            </div>

            <div className="footer-about-us col">
              <StyledLink to="/refund-policy">Refund Policy</StyledLink>
            </div>

            <div className="footer-about-us col">
              <StyledLink to="/terms-and-conditions">
                Terms and Conditions
              </StyledLink>
            </div>
          </ImportantLinks>
          <div className="row mt-auto">
            {/* <div className="col copyright-col"></div> */}
            <Copyright> &copy; 2022 Indian Kefir Company</Copyright>
          </div>
        </div>
      </FooterWrapper>
    </>
  );
};

export default Footer;
