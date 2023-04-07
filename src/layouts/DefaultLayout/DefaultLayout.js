import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer/>
    </div>
  );
}

DefaultLayout.propType = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
