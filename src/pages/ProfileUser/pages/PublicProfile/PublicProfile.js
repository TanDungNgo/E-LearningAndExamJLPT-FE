import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useState } from 'react';
import { Image } from 'antd';
import { Select, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

function PublicProfile() {
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  return (
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image
            className={cx("card__avatar-img")}
            src="/images/Phuong.jpg"
          />
          <div className={cx("card__btn")}>
            {/* <Upload>
              <Button primary className={cx("card__btn-change")}>Change picture</Button>
            </Upload> */}
            <div className={cx("card__btn-change")}>
              <label htmlFor="file">
                <UploadOutlined />
                Change picture
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
                //onChange={handleChangeFile}
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
