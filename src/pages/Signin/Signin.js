import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./Signin.module.scss";
const cx = classNames.bind(styles);
function Signin() {
  return (
    <div>
      <Button outline> Register</Button>
      <Button primary>Login</Button>
    </div>
  );
}

export default Signin;
