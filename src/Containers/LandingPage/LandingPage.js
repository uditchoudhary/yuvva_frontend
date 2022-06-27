import "react-responsive-carousel/lib/styles/carousel.min.css";
import BodyContainer from "../BodyContainer";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from "../../Store/Actions/ProductActions";
import { getCategories } from "../../Store/Actions/ProductActions";

const CategoryRender = ({ direction, category }) => {
  const { category_name, category_images, category_description, category_id } =
    category;
  const navigate = useNavigate();
  const handleShopNowClick = () => {
    navigate(`/${category_name}`);
  };

  return (
    <div className="container col-xxl-10">
      <div
        className={`row flex-lg-row${
          direction === 1 ? "-reverse" : ""
        } flex-sm-row${
          direction === 1 ? "-reverse" : ""
        } align-items-center g-5 pb-5`}
      >
        <div className="col-sm-5 col-lg-4 ">
          <img
            src="/static/images/probiotics.webp"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            loading="lazy"
          />
        </div>
        <div className="col-lg-8 col-sm-7 ">
          <h1 className="display-6 fw-bold lh-1 mb-3">{category_name}</h1>
          <p className="lead text-justify">{category_description}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-sm px-4 me-md-2"
              onClick={() => handleShopNowClick()}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCarousel = () => {
  return (
    <div
      id="myCarousel"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/static/images/Banner1.webp" alt="abnner1" />
          <div className="container">
            <div className="carousel-caption text-start d-none d-lg-block">
              <h1>Example headline.</h1>
              <p>
                Some representative placeholder content for the first slide of
                the carousel.
              </p>
              {/* <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Sign up today
                </a>
              </p> */}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/static/images/Banner1.webp" alt="abnner1" />

          <div className="container">
            <div className="carousel-caption d-none d-lg-block">
              {/* <h1>Another example headline.</h1> */}
              <p>
                Some representative placeholder content for the second slide of
                the carousel.
              </p>
              {/* <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Learn more
                </a>
              </p> */}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/static/images/Banner1.webp" alt="abnner1" />

          <div className="container">
            <div className="carousel-caption d-none d-lg-block text-end">
              <h1>One more for good measure.</h1>
              <p>
                Some representative placeholder content for the third slide of
                this carousel.
              </p>
              {/* <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Browse gallery
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const CategoryCarousel1 = () => {
  const bannerDummyData = [
    {
      bannerName: "Banner 1",
      className: "Active",
      img: {
        url: "/static/images/Banner1.webp",
        alt: "alt",
      },
      button: {
        slideTo: "0",
      },
      captionHeadline: "Example headline.",
      captionText:
        "Some representative placeholder content for the first slide of the carousel.",
      link: "#",
    },
    {
      bannerName: "Banner 2",
      className: "",
      img: {
        url: "/static/images/Banner1.webp",
        alt: "alt",
      },
      button: {
        slideTo: "0",
      },
      captionHeadline: undefined,
      captionText:
        "Some representative placeholder content for the second slide of the carousel.",
      link: "#",
    },
    {
      bannerName: "Banner 3",
      className: "",
      img: {
        url: "/static/images/Banner1.webp",
        alt: "alt",
      },
      button: {
        slideTo: "0",
      },
      captionHeadline: undefined,
      captionText:
        "Some representative placeholder content for the second slide of the carousel.",
      link: "#",
    },
  ];
  return (
    <div
      id="myCarousel"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {bannerDummyData.map((banner, index) => {
          return (
            <button
              key={index}
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={banner.slideTo}
              className={banner.className}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {bannerDummyData.map((banner, index) => {
          return (
            <div className={`carousel-item ${banner.className}`} key={index}>
              <img src={banner.img.url} alt={banner.img.alt} />
              <div className="container">
                <div className="carousel-caption text-start d-none d-lg-block">
                  <h1>{banner.captionHeadline}</h1>
                  <p>{banner.captionText}</p>
                  {/* <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Sign up today
                </a>
              </p> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productState.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <>
      <BodyContainer>
        {/* <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={5000}
          showStatus={false}
          showIndicators={false}
        >
      // List of banners
        </Carousel> */}
        <CategoryCarousel />
        {categories &&
          categories.map((cat, index) => {
            const {
              category_description,
              category_id,
              category_images,
              category_name,
            } = cat;
            return (
              <CategoryRender key={index} direction={index} category={cat} />
            );
          })}
      </BodyContainer>
    </>
  );
};

export default LandingPage;
