import classNames from "classnames/bind";
import styles from "./CommentItem.module.scss";

const cx = classNames.bind(styles);
const CommentItem = ({ author, content, datetime, avatarSrc }) => {
  return (
    <div className={cx("comment")}>
      <img src={avatarSrc} alt="Avatar" className={cx("comment-avatar")} />
      <div className={cx("comment-content")}>
        <div className={cx("comment-author")}>{author}</div>
        <div className={cx("comment-text")}>{content}</div>
        <div className={cx("comment-date")}>{datetime}</div>
      </div>
    </div>
  );
};

export default CommentItem;
