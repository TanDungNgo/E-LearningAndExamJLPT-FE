import classNames from "classnames/bind";
import styles from "./Signin.module.scss";
const cx = classNames.bind(styles);
function Signin() {
    return (<div className={cx("title")}>
        Login
    </div>  );
}

export default Signin;