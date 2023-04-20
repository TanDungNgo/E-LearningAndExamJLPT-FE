import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./Signin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Signin(){
    return (
        <div className= {cx("login-header")}>
            <div className={cx("title")}>Welcome to
                <div className={cx("title-2")}>DPT NIHONGO</div>
            </div>

            <div className={cx("container")}>
                <div className={cx("login-left")}>
                    <img className={cx("logo")} src="/images/Logo2.png" alt="logo"/>
                </div>
                <div className={cx("backgroud")} >
                    <div className={cx("login-right")}>
                        <form className={cx("login-form")}>
                            <div className={cx("login-form__content")}>
                                <div className={cx("login-form__item")}>
                                <FontAwesomeIcon icon={faUser} className={cx("icon-user")}></FontAwesomeIcon>
                                    <input type="text" id="username" placeholder="Username"/>
                                </div>
                                <FontAwesomeIcon icon={faLock} className={cx("icon-pass")}></FontAwesomeIcon>
                                <div className={cx("login-form__item")}>
                                    <input type="password" id="password" placeholder="Password" />
                                    {/* <span className={cx("show-btn")}></span> 
                                    <FontAwesomeIcon icon={faEye} className={cx("icon-eye")}></FontAwesomeIcon> */}
                                </div>
                                <div className={cx("login-form__item")}>
                                    <div className={cx("login-form__checkbox")}>
                                        <input type="checkbox"/>
                                        <label for="rememberMeCheckbox" className={cx("login-form__checkboxLable")}> Remember Me</label>
                                        <a href="#" className={cx("login-form__fp-link")}> Forget password? </a>
                                    </div>
                                </div>
                        
                                <div className={cx("login-form__button")}>
                                    <Button primary type="submit" className={cx("btn-login")}> Login </Button>
                                </div>
                                <div className={cx("login-form__text")}>Or</div>
                            </div>
                            <Button primary  className={cx("btn-fb")} 
                            leftIcon={<FontAwesomeIcon icon={faFacebook} className={cx("icon-fb")}/>}> Continue width Facebook </Button>
                            <Button primary  className={cx("btn-gg")} 
                            leftIcon={<FontAwesomeIcon icon={faGoogle} className={cx("icon-gg")}/>}>   Continue width Google </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signin;
