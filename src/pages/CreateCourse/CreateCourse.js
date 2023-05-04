import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { useState } from "react";
import { Progress } from "antd";
const cx = classNames.bind(styles);

function CreateCourse() {
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  const [percent, setPercent] = useState(0);
  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setImgSrc(e.target.result);
        setPercent(100);
      };
    }
  };
  return (
    <div className={cx("container")}>
      <img className={cx("bg-create")} src="/images/bg_create-course.png" />
      <div className={cx("card-create")}>
        <div className={cx("card-create__left")}>
          <div className={cx("card-create__title")}>Create a new course</div>
          <div className="card-create__detail">
            <input type="text" placeholder="Course Name" required />
          </div>
          <div className={cx("card-create__select")}>
            <select>
              <option selected disabled>
                Level
              </option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
            </select>
          </div>
          <div className="card-create__detail">
            <input type="text" placeholder="Description" required />
          </div>
          <div className="card-create__detail">
            <input type="text" placeholder="Duration" required />
          </div>
          <div className="card-create__detail">
            <input type="text" placeholder="Price" required />
          </div>
          <Button className={cx("card-create__btn")}>Create</Button>
        </div>

        <div className={cx("card-create__right")}>
          <div className={cx("card-create-banner")}>
            <img className={cx("card-create-banner__img")} src={imgSrc} />
          </div>
          <div className={cx("card-create__import-file")}>
              <label for="file">Choose a file</label>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
                onChange={handleChangeFile}
                accept="image/*"
              />
              <Progress percent={percent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
