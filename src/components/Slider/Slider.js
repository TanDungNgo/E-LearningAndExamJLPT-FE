import { useState, useEffect } from "react";
import { SliderData } from "./SliderData";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = SliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

//   useEffect(() => {
//     if (autoScroll) {
//       auto();
//     }
//     return () => clearInterval(slideInterval);
//   }, [currentSlide]);

  return (
    <div className={cx("slider")}>
      <div className={cx("arrow","prev")} onClick={prevSlide}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className={cx("arrow","next")} onClick={nextSlide}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      {SliderData.map((slide, index) => {
        return (
          <div
            className={
              index === currentSlide ? cx("slide","current") : cx("slide")
            }
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className={cx("image")} />
                <div className={cx("content")}>
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  <Button primary>Get Started</Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
