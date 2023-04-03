import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import Menu from "~/components/Popper/Menu/Menu";
const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Course",
    to: "/course",
  },
  {
    title: "Grammar",
    to: "/grammar",
  },
];
const Header = () => {
  const dropdown = () => {
    const toggleBtn = document.getElementsByClassName(cx("toggle-btn"));
    const dropDownMenu = document.getElementsByClassName(cx("dropdown-menu"));
    dropDownMenu[0].classList.toggle(cx("open"));
    const isOpen = dropDownMenu[0].classList.contains(cx("open"));
  };
  const renderMenu = () => {
    return MENU_ITEMS.map((item, index) => {
      return (
          <Link key={index} className={cx("header__link-item")} to={item.to}>{item.title}</Link>
      );
    });
  };
  return (
    <header>
      <div className={cx("navbar")}>
        <div className={cx("logo")}>
          <img
            width="80"
            src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.15752-9/338534582_1256415671654223_1670260949440965923_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=ILbXqRdkdKkAX9uc0Gb&_nc_ht=scontent.fdad1-3.fna&oh=03_AdQOqON75b5RlMDA-LO8WUSZakDpmTZOeSE6N_vJHp-1Aw&oe=644DBE4C"
          />
        </div>
        <div className={cx("links")}>
          {renderMenu()}
        </div>

        <div className={cx("action__btn")}>
          <Button outline className={cx("action__btn-register")}>
            Register
          </Button>
          <Button
            primary
            className={cx("action__btn-login")}
            to={routes.signin}
          >
            Login
          </Button>
          <Menu items={MENU_ITEMS}>
            <div className={cx("toggle-btn")} onClick={dropdown}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
