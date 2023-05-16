import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useState } from 'react';
import { Image } from 'antd';
import { Select, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

function PublicProfile() {
  const [fileImage, setFileImage] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/Phuong.jpg");
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
  return (
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image
            className={cx("card__avatar-img")}
            src={imgSrc}
          />
          <div className={cx("card__btn")}>
            {/* <Upload>
              <Button primary className={cx("card__btn-change")}>Change picture</Button>
            </Upload> */}
            <div className={cx("card__btn-change")}>
              <Button primary>
                <label htmlFor="file">
                Change picture
                </label>
              </Button>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
                onChange={handleChangeFile}
                accept="image/*"
              />
            </div>
              <Button outline className={cx("card__btn-delete")}>Delete picture</Button>
          </div>
        </div>
        <div className={cx("card__info")}>
          <div className={cx("card__info-name")}>
              <input type="text" placeholder="First name" required/>
              <input type="text" placeholder="Last name" required/>
          </div>
          <div className={cx("card__info-detail")}>
              <input type="text" placeholder="Email" required/>
              <Select
                className={cx("card__select")}
                defaultValue="Gender"
                style={{ width: 505, color: 'green' }}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' }
                ]}
              />
              <input type="text" placeholder="Position" required/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
