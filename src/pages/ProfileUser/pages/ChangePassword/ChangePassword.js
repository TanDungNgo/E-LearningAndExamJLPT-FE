import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./ChangePassword.module.scss";
import React from 'react';
const cx = classNames.bind(styles);

function ChangePassword() {
  return (
    <div>
      <div className={cx("card")}>
        <div className={cx("card__title")}>Change Password</div>
        <div className={cx("card__body")}>
          <input type="password" placeholder="Old Password" required/>
          <input type="password" placeholder="New Password" required/>
          <input type="password" placeholder="ConfirmPassword" required/>
          <div className={cx("card__btn")}>
            <Button primary className={cx("card__btn-change")}>Change</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
