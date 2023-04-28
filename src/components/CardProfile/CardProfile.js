import classNames from "classnames/bind";
import Button from "../Button/Button";
import styles from "./CardProfile.module.scss";
const cx = classNames.bind(styles);
function CardProfile() {
  return (
    <div className={cx("card")}>
        <div className={cx("card__title")}>Public profile</div>
        <div className={cx("card__avatar")}>
            <img 
                src="/images/Phuong.jpg"
                className={cx("card__avatar-img")}>
            </img>
        </div>
        <div className={cx("card__btn")}>
            <Button primary className={cx("card__btn-change")}>Change picture</Button>
            <Button outline className={cx("card__btn-delete")}>Delete picture</Button>
        </div>
        <div className={cx("card__info")}>
            <div className={cx("card__info-name")}>
                <input type="text" placeholder="First name" required/>
                <input type="text" placeholder="Last name" required/>
            </div>
            <div className={cx("card__info-detail")}>
                <input type="text" placeholder="Email" required/>
                <input type="text" placeholder="Phone Number" required/>
                <input type="text" placeholder="Position" required/>
            </div>
        </div>
    </div>
  );
}

export default CardProfile;
