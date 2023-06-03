import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Lesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faInfoCircle,
  faNoteSticky,
  faPlayCircle,
  faPlus,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import CommentItem from "~/components/Comment/CommentItem";
import { Badge, Button, Drawer, Input, Progress } from "antd";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useNavigate, useParams } from "react-router-dom";
import lessonService from "~/services/lessonService";
import moment from "moment";
import courseService from "~/services/courseService";
import { useSelector } from "react-redux";
import AuthService from "~/services/authService";
const cx = classNames.bind(styles);
function Lesson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { courseId } = useParams();
  const { getLessonById, getCommentByLessonId, commentLesson } = lessonService();
  const { getCourseById } = courseService();
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { getCurrentUser } = AuthService();
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

  useEffect(() => {
    getCourseById(courseId).then((res) => {
      setCourse(res);
      setLessons(res.lessons);
    });
  }, [courseId]);
  useEffect(() => {
    getLessonById(id).then((res) => {
      setLesson(res);
    });
  }, [id]);
  useEffect(() => {
    getCommentByLessonId(id).then((res) => {
      setComments(res);
    });
  }, [id]);
  const handleLessonClick = (id) => {
    navigate(`/course/${courseId}/lesson/${id}`);
  };
  const handleComment = () => {
    const data = {
      "content": comment,
      "lessonId": id
    };
    commentLesson(data);
    const newComment = {
      id: comments.length + 1,
      content: comment,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.firstname,
      avatar: currentUser?.avatar,
      replies: [],
    };

    setComments([...comments, newComment]);
    setComment("");
  }
  return (
    <div className={cx("lesson-container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <FontAwesomeIcon icon={faPlayCircle} className={cx("icon-play")} />
          <span>
            {course?.name} | {lesson?.name}
          </span>
        </div>
        <div className={cx("tool")}>
          <div className={cx("progress")}>
            <Progress
              type="circle"
              percent={50}
              className={cx("icon")}
              size={35}
            />
            <div className={cx("total-lesson")}>
              1/<span>{course?.lessons.length}</span>lessons
            </div>
          </div>
          <div className={cx("note")}>
            <FontAwesomeIcon icon={faStickyNote} className={cx("icon-note")} />
            <span>Note</span>
          </div>
          <div className={cx("instruction")}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={cx("icon-instruction")}
            />
            <span>Instruction</span>
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("content__left")}>
          <div className={cx("video")}>
            <video src={lesson?.urlVideo} controls></video>
          </div>
        </div>
        <div className={cx("content__right")}>
          <div className={cx("title")}>Course content</div>
          <div className={cx("lesson-list")}>
            {lessons.map((lesson, index) => (
              <div
                className={
                  id === lesson.id.toString()
                    ? cx("lesson-item", "active")
                    : cx("lesson-item")
                }
                key={index}
                onClick={() => handleLessonClick(lesson?.id)}
              >
                <div className={cx("lesson-item__title")}>
                  <span>{index + 1}</span>
                  {lesson?.name}
                </div>
                <div className={cx("lesson-item__time")}>
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className={cx("icon-play")}
                  />
                  <span>10:00</span>
                </div>
              </div>
            ))}
            <div className={cx("list-content")}>{/* {renderCard()}; */}</div>
          </div>
        </div>
      </div>
      <div className={cx("footer")}>
        <div className={cx("footer__left")}>
          <div className={cx("title")}>{lesson?.name}</div>
          <div className={cx("date")}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>{moment(lesson?.createdDate).format("MMMM DD, YYYY")}</span>
          </div>
          <div className={cx("comment")}>
            <div className={cx("comment__title")}>
              (<span>{lesson?.comments.length}</span>)Comment
            </div>
            <div className={cx("comment__list")}>
              {comments.map((comment, index) => (
                <CommentItem
                  key={index}
                  lessonId={id}
                  commentId={comment?.id}
                  author={comment?.createdBy}
                  content={comment?.content}
                  avatarSrc={comment?.avatar}
                  datetime={moment(comment?.createdAt).format(
                    "MMMM DD, YYYY"
                  )}
                  replies={comment?.replies}
                />
              ))}
            </div>
            <div className={cx("comment__input")}>
              <Input.TextArea value={comment} placeholder="Comment..." onChange={(e)=> setComment(e.target.value)}/>
              <Button type="primary" style={{ marginTop: "5px" }} onClick={handleComment}>
                Post
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("footer__right")}>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              setCommentsOpen(true);
            }}
          >
            Add note
          </Button>
          <Drawer
            title="Notes"
            open={commentsOpen}
            onClose={() => {
              setCommentsOpen(false);
            }}
            maskClosable
          >
            <div className={cx("note-form")}>
              <div className={cx("note-form__title")}>
                <span>(05:00)</span>
              </div>
              <div className={cx("note-form__content")}>
                {/* <Slate editor={editor} value={value} onChange={handleChange}>
                  <Editable />
                </Slate> */}
                <Input.TextArea />
                <Button type="primary" style={{ marginTop: "5px" }}>
                  Save
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
