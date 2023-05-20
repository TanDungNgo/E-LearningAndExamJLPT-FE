import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar, faComments, faEnvelope, faPhone, 
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import Menu from "~/components/Popper/Menu/Menu";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <footer>
            <div className={cx("footer")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("footer-col")}>
                            <h3>DPT Nihongo</h3>
                            <span className={cx("col-address")}>234 Ngu Hanh Son Street, Ngu Hanh Son District, Da Nang City</span>
                            <div className={cx("socials-link")}>
                                <a href="#"><FontAwesomeIcon icon={faFacebook} className={cx("icon")}></FontAwesomeIcon></a>
                                <a href="#"><FontAwesomeIcon icon={faInstagram} className={cx("icon")}></FontAwesomeIcon></a>
                                <a href="#"><FontAwesomeIcon icon={faTwitter} className={cx("icon")}></FontAwesomeIcon></a>
                                <a href="#"><FontAwesomeIcon icon={faLinkedin} className={cx("icon")}></FontAwesomeIcon></a>
                            </div>
                        </div>
                        <div className={cx("footer-col")}>
                            <h4>Contact Us</h4>
                            <ul>
                                <div className={cx("col-details")}>
                                    <FontAwesomeIcon icon={faEnvelope} className={cx("icon__footer")}></FontAwesomeIcon>
                                    DPTNihongo@gmail.com
                                </div>
                                <div className={cx("col-details")}>
                                    <FontAwesomeIcon icon={faPhone} className={cx("icon__footer")}></FontAwesomeIcon>
                                    0324786985
                                </div>  
                                <div className={cx("col-details")}>
                                    <FontAwesomeIcon icon={faCalendar} className={cx("icon__footer")}></FontAwesomeIcon>
                                    Mon-Sat: 8a.m-5p.m
                                </div>
                                <div className={cx("col-details")}>
                                    <FontAwesomeIcon icon={faComments} className={cx("icon__footer")}></FontAwesomeIcon>
                                    Contact help
                                </div>
                            </ul>
                        </div>
                        <div className={cx("footer-col")}>
                            <h4>More On Center</h4>
                            <ul>

                                <span className={cx("col-details")}>Home</span>
                                <span className={cx("col-details")}>Introduction</span>
                                <span className={cx("col-details")}>Terms of use</span>
                                <span className={cx("col-details")}>Support in registration</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
