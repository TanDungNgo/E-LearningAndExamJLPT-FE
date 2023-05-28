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
const cx = classNames.bind(styles);
function Lesson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { courseId } = useParams();
  const { getLessonById} = lessonService();
  const { getCourseById } = courseService();
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState();
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    getCourseById(courseId).then((res) => {
      setCourse(res);
      setLessons(res.lessons);
    });
  }, []);
  useEffect(() => {
    getLessonById(id).then((res) => {
      setLesson(res);
    });
  }, []);
  const handleLessonClick = (id) => {
    navigate(`/course/${courseId}/lesson/${id}`);
    window.location.reload();  
  };
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
              (<span>1</span>)Comment
            </div>
            <div className={cx("comment__list")}>
              <CommentItem
                author="TanDung"
                content="Great !!"
                avatarSrc="https://i.pinimg.com/originals/51/90/10/519010d9ee8167bfe445e616f260f758.png"
                datetime="8 hours ago"
              />
            </div>
            <div className={cx("comment__input")}>
              <Input.TextArea placeholder="Comment..." />
              <Button type="primary" style={{ marginTop: "5px" }}>
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
