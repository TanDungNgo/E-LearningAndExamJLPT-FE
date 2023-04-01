import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classNames.bind(styles);

const Header = () => {
  const [checkDropDownMenu, SetCheckDropDownMenu] = useState(true);
  const dropdown = () => {
    const toggleBtn = document.getElementsByClassName(cx("toggle-btn"));
    const dropDownMenu = document.getElementsByClassName(cx("dropdown-menu"));

    // if (checkDropDownMenu) {
    //   dropDownMenu[0].classList.toggle(cx("open"));
    // } else {
    //     dropDownMenu[0].classList.remove(cx("open"));
    // }
    dropDownMenu[0].classList.toggle(cx("open"));
    const isOpen = dropDownMenu[0].classList.contains(cx("open"));
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
        <ul className={cx("links")}>
          <li><a href="home"> Home </a></li>
          <li><a href="course"> Course </a></li>
          <li><a href="grammar"> Grammar </a></li>
          <li><a href="vocabulary"> Vocabulary</a></li>
          <li><a href="article"> Article </a></li>
          <li><a href="poscast"> Poscast </a></li>
        </ul>

        <div className={cx("action__btn")}>
          <Button primary className={cx("action__btn-login")}>
            Login
          </Button>
          <Button outline className={cx("action__btn-register")}>
            Register
          </Button>
          <div className={cx("toggle-btn")} onClick={dropdown}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </div>
      <div className={cx("dropdown-menu")}>
        <li><a href="home"> Home </a></li>
        <li><a href="course"> Course </a></li>
        <li><a href="grammar"> Grammar </a></li>
        <li><a href="vocabulary"> Vocabulary</a></li>
        <li><a href="article"> Article </a></li>
        <li><a href="poscast"> Poscast </a></li>
        <li><Button primary className={cx("action__btn-login")}>Login</Button></li>
        <li><Button outline className={cx("action__btn-register")}>Register</Button></li>
      </div>
    </header>
  );
};

export default Header;
