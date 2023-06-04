import classNames from "classnames/bind";
import styles from "./CommentItem.module.scss";
import moment from "moment";
import { faEdit, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
import lessonService from "~/services/lessonService";

const cx = classNames.bind(styles);
const CommentItem = ({
  lessonId,
  commentId,
  author,
  content,
  datetime,
  avatarSrc,
  replies,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [comment, setComment] = useState("");
  const [repliesComment, setRepliesComment] = useState(replies);
  const { getCurrentUser } = AuthService();
  const { commentLesson } = lessonService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  const handleComment = () => {
    const data = {
      content: comment,
      lessonId: lessonId,
      parentCommentId: commentId,
    };
    commentLesson(data);
    const newComment = {
      id: repliesComment?.length + 1,
      content: comment,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.firstname,
      avatar: currentUser?.avatar,
      replies: [],
    };
    setRepliesComment([...repliesComment, newComment]);
    setComment("");
  };
  return (
    <div>
      <div className={cx("comment")}>
        <img src={avatarSrc} alt="Avatar" className={cx("comment-avatar")} />
        <div className={cx("comment-content")}>
          <div className={cx("comment-author")}>{author}</div>
          <div className={cx("comment-text")}>{content}</div>
          <div className={cx("comment-more")}>
            <div className={cx("comment-date")}>{datetime}</div>
            <div className={cx("comment-reply")} onClick={toggleReplies}>
              <span>Replies</span>({replies?.length})
              <FontAwesomeIcon icon={faReply} />
            </div>
            <div className={cx("comment-edit")}>
              <span>Edit</span>
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className={cx("comment-delete")}>
              <span>Delete</span>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
      {showReplies && (
        <div className={cx("comment-replies")}>
          {repliesComment && repliesComment.length > 0 && (
            <div className={cx("replies")}>
              {repliesComment.map((reply) => (
                <div key={reply?.id} className={cx("reply")}>
                  <img
                    src={reply?.avatar}
                    alt="Avatar"
                    className={cx("comment-avatar")}
                  />
                  <div className={cx("comment-content")}>
                    <div className={cx("comment-author")}>
                      {reply?.createdBy}
                    </div>
                    <div className={cx("comment-text")}>{reply?.content}</div>
                    <div className={cx("comment-more")}>
                      <div className={cx("comment-date")}>
                        {moment(reply?.createdAt).format("MMMM DD, YYYY")}
                      </div>
                      <div className={cx("comment-edit")}>
                        <span>Edit</span>
                        <FontAwesomeIcon icon={faEdit} />
                      </div>
                      <div className={cx("comment-delete")}>
                        <span>Delete</span>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={cx("reply-input")}>
            <Input.TextArea
              value={comment}
              placeholder="Comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="primary"
              style={{ marginTop: "5px" }}
              onClick={handleComment}
            >
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
