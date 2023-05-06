import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useState } from "react";
import { Progress } from "antd";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { UploadOutlined } from "@ant-design/icons";
import storageFirebase from "~/configs/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import courseService from "~/services/courseService";
const cx = classNames.bind(styles);

function CreateCourse() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("N5");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  const [fileImage, setFileImage] = useState("");
  const [percent, setPercent] = useState(0);
  const { createCourse } = courseService();
  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    setFileImage(file);
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
      };
    }
  };
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const storageRef = ref(storageFirebase, `images/${fileImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const data = {
          name: name,
          level: level,
          description: description,
          duration: duration,
          price: price,
          banner: url,
        };
        console.log(data);
        createCourse(data);
      }
    );
  };
  return (
    <div className={cx("container")}>
      <img className={cx("bg-create")} src="/images/bg_create-course.png" />
      <div className={cx("card-create")}>
        <div className={cx("card-create__title")}>Create a new course</div>
        <div className={cx("card-create__content")}>
          <div className={cx("card-create__left")}>
            <div className="card-create__detail">
              <input
                type="text"
                placeholder="Course Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={cx("card-create__select")}>
              <select onChange={(e) => setLevel(e.target.value)}>
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
            </div>
            <div className="card-create__detail">
              <input
                type="text"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="card-create__detail">
              <input
                type="text"
                placeholder="Duration"
                required
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="card-create__detail">
              <input
                type="text"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className={cx("card-create__right")}>
            <img className={cx("card-create__banner")} src={imgSrc} />
            <div className={cx("card-create__import-file")}>
              <label htmlFor="file">
                <UploadOutlined />
                Choose a file
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
                onChange={handleChangeFile}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <Button
          primary
          className={cx("card-create__btn")}
          onClick={handleCreateCourse}
        >
          Create
        </Button>
        <Progress percent={percent} />
      </div>
    </div>
  );
}

export default CreateCourse;
