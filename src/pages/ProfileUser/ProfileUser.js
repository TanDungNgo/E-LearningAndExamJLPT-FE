import classNames from "classnames/bind";
import styles from "./ProfileUser.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import routes from "~/config/routes";
const cx = classNames.bind(styles);

function ProfileUser(){
  return (
    <div className={cx("card")}>
        <div className={cx("card__menu")}>
            <Button className={cx("card__menu-btn")} to={routes.signup}>Public Profile</Button>
        </div>
        <div className={cx("card__menu")}>
            <Button className={cx("card__menu-btn")} to={routes.signup}>Account Settings</Button>
        </div>
        <div className={cx("card__menu")}>
            <Button className={cx("card__menu-btn")} to={routes.signup}>Notifications</Button>
        </div>
        <div className={cx("card__menu")}>
            <Button className={cx("card__menu-btn")} to={routes.signup}>My Courses</Button>
        </div>
        <div className={cx("card__menu")}>
            <Button className={cx("card__menu-btn")} to={routes.signup}>Bookmarks</Button>
        </div>
    </div>
  );
}

export default ProfileUser