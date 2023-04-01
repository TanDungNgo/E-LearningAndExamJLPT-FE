import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./Signin.module.scss";
const cx = classNames.bind(styles);
function Signin(){
    return (
        <div className= {cx("login-header")}>
        <div className={cx("title")}>Welcome to
            <div className={cx("title-2")}>DPT NIHONGO</div>
        </div>

        <div className={cx("container")}>
        <div className={cx("login-left")}>
            <img width="540" height="421" src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.15752-9/338534582_1256415671654223_1670260949440965923_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=ILbXqRdkdKkAX_3XzvG&_nc_ht=scontent.fdad1-3.fna&oh=03_AdSex6_Df4T9pniT_7NQhJezfotrYHKvz9fg-ayBXizC6Q&oe=644D4DCC" alt=""/>
        </div>
        <div className={cx("login-right")}>
            <form className={cx("login-form")}>
                <div className={cx("login-form__content")}>
                    <div className={cx("login-form__item")}>
                        <label for = "username"> Username </label>
                        <input type="text" id="username"/>
                    </div>
                    <div className={cx("login-form__item")}>
                        <label for="password"> Password </label>
                        <input type="password" id="password"/>


                    </div>
                    <div className={cx("login-form__item")}>
                        <div className={cx("login-form__checkbox")}>
                            <input type="checkbox"/>
                            <label for="rememberMeCheckbox" className={cx("login-form__checkboxLable")}> Remember Me</label>
                            <a href="#" className={cx("login-form__fp-link")}> Forget password? </a>
                        </div>
                    </div>
               
                    <div className={cx("login-form__button")}>
                        <button type="submit"> Login </button>
                    </div>
                    <div className={cx("login-form__text")}>Or</div>
                </div>
                <div className={cx("login-form__footer__fb")}>
                    <a href="" className={cx("login-form__link")}>
                    <img width="30"
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.15752-9/337753173_5829474557181675_80404494461578706_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=i5orTO0-xrMAX9EZd6d&_nc_ht=scontent.fdad1-3.fna&oh=03_AdTDn_5Xoa4YEeuCNKsUrw62pak2uLTWJmcFZakoteOiTw&oe=644D6157" />
                         Continue with Facebook
                    </a>
                </div>
                <div className={cx("login-form__footer__gg")}>
                <a href="" className={cx("login-form__link")}>
                <img width="30"
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.15752-9/337881366_211377414833368_4105560806932212970_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=vLBEOuVP-A4AX9OLw4o&_nc_ht=scontent.fdad1-3.fna&oh=03_AdRVGJfHHkCpWQGyn4E8wodaJN9qePZnjx4li8u94_gozw&oe=644D3BFE"/>
                         Continue with Google
                    </a>
                </div>
            </form>
        </div>
    </div>

    </div>


    );
export default Signin;
