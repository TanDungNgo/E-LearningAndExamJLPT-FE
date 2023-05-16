import classNames from "classnames/bind";
import Button from "../Button/Button";
import styles from "./CardProfile.module.scss";
import React from 'react';
import { Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const cx = classNames.bind(styles);

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function CardProfile() {
  return (
    <div className={cx("card")}>
        <div className={cx("card__title")}>Public profile</div>
        <div className={cx("card__avatar")}>
            <Image
                className={cx("card__avatar-img")}
                src="/images/Phuong.jpg"
            />
        </div>
        <div className={cx("card__btn")}>
            {/* <Button primary className={cx("card__btn-change")}>Change picture</Button> */}
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Button outline className={cx("card__btn-delete")}>Delete picture</Button>
        </div>
        <div className={cx("card__info")}>
            <div className={cx("card__info-name")}>
                <input type="text" placeholder="First name" required/>
                <input type="text" placeholder="Last name" required/>
            </div>
            <div className={cx("card__info-detail")}>
                <input type="text" placeholder="Email" required/>
                <input type="text" placeholder="Phone Number" required/>
                <input type="text" placeholder="Position" required/>
            </div>
        </div>
    </div>
  );
}

export default CardProfile;
