import React, { useMemo, useState } from "react";
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
const cx = classNames.bind(styles);
const lessons = [
  {
    title: "Giới thiệu lộ trình học tập cho người mới bắt đầu",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/fir-react-upload-bad49.appspot.com/o/files%2F20%20C%C3%82U%20TI%E1%BA%BENG%20NH%E1%BA%ACT%20NG%E1%BA%AEN%20TH%C3%94NG%20D%E1%BB%A4NG.mp4?alt=media&token=9fba790b-ee9d-4320-b3c9-06b73e10da12",
  },
  { title: "Học từ vựng cấp tốc", videoUrl: "" },
];
function Lesson() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Hello, Slate!' }],
    },
  ]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleLessonClick = () => {};
  return (
    <div className={cx("lesson-container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <FontAwesomeIcon icon={faPlayCircle} className={cx("icon-play")} />
          <span>
            Lộ trình học tiếng Nhật cho người mới bắt đầu | Học tiếng Nhật cấp
            tốc
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
              1/<span>2</span>lesson
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
            <video src={lessons[currentLesson].videoUrl} controls></video>
          </div>
        </div>
        <div className={cx("content__right")}>
          <div className={cx("title")}>Course content</div>
          <div className={cx("lesson-list")}>
            {lessons.map((lesson, index) => (
              <div
                className={
                  index === currentLesson
                    ? cx("lesson-item", "active")
                    : cx("lesson-item")
                }
                key={index}
                onClick={() => handleLessonClick(lesson.videoUrl)}
              >
                <div className={cx("lesson-item__title")}>
                  <span>{index + 1}</span>
                  {lesson.title}
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
          </div>
        </div>
      </div>
      <div className={cx("footer")}>
        <div className={cx("footer__left")}>
          <div className={cx("title")}>
            Giới thiệu lộ trình học tập cho người mới bắt đầu
          </div>
          <div className={cx("date")}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>May 11, 2023</span>
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
