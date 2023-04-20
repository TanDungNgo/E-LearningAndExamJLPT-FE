import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import Slider from "~/components/Slider/Slider";
import ListCourse from "~/components/ListCourse/ListCourse";
import ListArticle from "~/components/ListArticle/ListArticle";
const cx = classNames.bind(styles);

const Home = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex(backgroundIndex => (backgroundIndex + 1) % 3);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      {/* <section className={cx("slider__container")}>
        <section className={cx("slider")}>
          <div className={cx("slider__item")}>
            <img src="/images/backgroundHom2.png" alt="background-home" style={{width:"100%"}}></img>
          </div>
          <div className={cx("slider__item")}>
            <img src="/images/backgroundHome.png" alt="background-home" style={{width:"100%"}}></img>
          </div>
        </section>
      </section> */}
      {/* <Slider/> */}
      <ListCourse/>
      <ListArticle/>
    </div>
  );
};


export default Home;
