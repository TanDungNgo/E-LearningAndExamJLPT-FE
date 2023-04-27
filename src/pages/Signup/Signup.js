import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars, faCalendar, faComment, faCommentAlt, faComments, faEnvelope, faPhone, faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
const cx = classNames.bind(styles);

function Signup(){
  return (
    <div className={cx("container")}>
        <div className={cx("signup-left")}>
            <div className={cx("title")}>Sign Up</div>
            <div className={cx("input-box__name")}>
                <div>
                <input type="text" placeholder="First name" required/>
                </div>
                <div>
                <input type="text" placeholder="Last name" required/>
                </div>
            </div>
            <div className={cx("input-radio-box")}>
                <span className={cx("details")}>Gender:</span>
                <input type="radio" required/>
                <span className={cx("details")}>Male</span>
                <input type="radio" required/>
                <span className={cx("details")}>Female</span>
            </div>
            <div className={cx("input-box")}>
                <input type="text" placeholder="Email" required/>
            </div>
            <div className={cx("input-box")}>
                <input type="text" placeholder="Phone number" required/>
            </div>
            <div className={cx("input-box")}>
                <input type="text" placeholder="Username" required/>
            </div>
            <div className={cx("input-box")}>
                <input type="text" placeholder="Password" required/>
            </div>
            <div className={cx("input-box")}>
                <input type="text" placeholder="Confirm password" required/>
            </div>
            <div className={cx("input-radio-box")}>
                <span className={cx("details")}>Type Account:</span>
                <input type="radio" required/>
                <span className={cx("details")}>Student</span>
                <input type="radio" required/>
                <span className={cx("details")}>Teacher</span>
            </div>
            <Button className={cx("btn_submit")}>Create</Button>
            <div className={cx("text")}>
                <span className={cx("text-detail")}>If you have account</span>
                <Link  to={routes.signin}> LOG IN</Link>
            </div>
        </div>
        <div className={cx("signup-right")}>
            <img className={cx("img-right")} src="https://img.freepik.com/premium-vector/group-happy-students-with-backpacks-books-their-hands-school-college-students-together_165429-1249.jpg"/>
        </div>
    </div>
  );
}

export default Signup