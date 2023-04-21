import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function ProfileTeacher() {
    return (
        <div>
            <div className={cx("profile")}>
            <div className={cx("overlap-group")}>
            <h1 className={cx("title")} >Personal Information</h1>
            <div className={cx("rectangle")}>
                <img className={cx("image")} src="/images/Trang.png" 
                alt=""/><img className={cx("upload")} src="/images/upload.png" alt/>
                <div className={cx("upload-avatar")}> Upload avatar</div>
                <div className={cx("form-information")}>
                    <p className={cx("firstname")}>
                        First name:Le
                    </p>
                    <p className={cx("lastname")}>
                        Last name:Huyen Trang
                    </p>
                    <p className={cx("address")}>
                        Address:Da Nang
                    </p>
                    <p className={cx("email")}>
                        Email:letrangle2002@gmail.com
                    </p>
                    <p className={cx("phone-number")}>
                        Phone number: 0328626786
                    </p>
                    <p className={cx("position")}>
                        Position:Teacher
                    </p>
                    <img className={cx("edit")} src="/images/edit.png" alt=""/>                
                </div>
            </div>
            <Button primary  className={cx("btn-create")}
             leftIcon={<FontAwesomeIcon icon={faAdd} className={cx("icon-minus")}/>}>
                 Create course </Button>
        </div>

    </div>
        </div>
     );
}

export default ProfileTeacher;