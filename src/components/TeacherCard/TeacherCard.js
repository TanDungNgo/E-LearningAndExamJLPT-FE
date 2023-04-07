import classNames from "classnames/bind";
import styles from "./TeacherCard.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function TeacherCard() {
  const [description, setDescription] = useState(
    "Living and working in Japan for 3 years;Japanese level: N2;Experienced teaching Japanese"
  );

  const renderDescription = description.split(";").map((item, index) => {
    return (
      <div key={index}>
        <p>{item}</p>
      </div>
    );
  });
  return (
    <a href="#" className={cx("card")}>
      <div>
        <img
          src="https://w.ladicdn.com/s600x600/60de77f2a8872c0012f2639a/5-20221116065753-l-plo.png"
          alt=""
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__name")}>Le Thao</div>
      <div className={cx("card__description")}>{renderDescription}</div>
    </a>
  );
}

export default TeacherCard;
