import classNames from "classnames/bind";
import styles from "./ExamFolder.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import { Select, Modal } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ExamFolder() {
  const [openModal, setOpenModal] = useState(false);
  const [examLevel, setExamLevel] = useState(""); // N5, N4, N3, N2, N1
  const navigate = useNavigate();

  const handleClickExam = (level) => {
    setExamLevel(level);
    setOpenModal(true);
  };

  // Handle click out boundary of modal
  const handleClickStart = () => {
    navigate(`/exam/${examLevel}`);
  };

  // Handle click button "X" of modal
  const handleClickCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japan/2022-06-28-secondhand-shopping-books-guide/header-2560x.jpg"
        ></img>
      </div>
      <div className={cx("exam-folder__header")}>
        Choose
        <div className={cx("exam-folder__title1")}>Level Exam</div>
      </div>
      <div className={cx("exam-folder__container")}>
        <div className={cx("container__choice-exam__group")}>
          <div className={cx("container__choice-exam__group__list")}>
            <div
              className={cx("container__choice-exam__group__list__exam")}
              onClick={() => handleClickExam("N5")}
            >
              <img
                className={cx(
                  "container__choice-exam__group__list__exam__image"
                )}
                src="/images/N5.png"
                alt=""
              />
            </div>
            <div
              className={cx("container__choice-exam__group__list__exam")}
              onClick={() => handleClickExam("N4")}
            >
              <img
                className={cx(
                  "container__choice-exam__group__list__exam__image"
                )}
                src="/images/N4.png"
                alt=""
              />
            </div>
            <div
              className={cx("container__choice-exam__group__list__exam")}
              onClick={() => handleClickExam("N3")}
            >
              <img
                className={cx(
                  "container__choice-exam__group__list__exam__image"
                )}
                src="/images/N3.png"
                alt=""
              />
            </div>
            <div
              className={cx("container__choice-exam__group__list__exam")}
              onClick={() => handleClickExam("N2")}
            >
              <img
                className={cx(
                  "container__choice-exam__group__list__exam__image"
                )}
                src="/images/N2.png"
                alt=""
              />
            </div>
            <div
              className={cx("container__choice-exam__group__list__exam")}
              onClick={() => handleClickExam("N1")}
            >
              <img
                className={cx(
                  "container__choice-exam__group__list__exam__image"
                )}
                src="/images/N1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cx("exam-folder__honors")}>
        <div className={cx("exam-folder__honors__title")}>
          Gold board honors excellent students
        </div>
        <div className={cx("exam-folder__honors-student")}>
          <div className={cx("exam-folder__honors__container-list")}>
            <div className={cx("exam-folder__honors__list-student1")}>
              <img
                src="https://riki.edu.vn/online/design-jlpt/images/jlpt102022/1.png"
                className={cx("exam-folder__honors__img1")}
              ></img>
            </div>
            <div className={cx("exam-folder__honors__list-student2")}>
              <img
                src="https://riki.edu.vn/online/design-jlpt/images/jlpt102022/2.png"
                className={cx("exam-folder__honors__img2")}
              ></img>
            </div>
            <div className={cx("exam-folder__honors__list-student3")}>
              <img
                src="https://riki.edu.vn/online/design-jlpt/images/jlpt102022/3.png"
                className={cx("exam-folder__honors__img3")}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div>
            <div className={cx("modal__title")}>JLPT MOCK EXAM</div>
            <div className={cx("modal__content")}>
              <div className={cx("modal__container-time")}>
                <FontAwesomeIcon
                  icon={faClock}
                  className={cx("modal__icon-time")}
                />
                <div className="modal__time"> 105 Minutes</div>
              </div>

              <div className={cx("modal__container-user")}>
                <FontAwesomeIcon
                  icon={faUser}
                  className={cx("modal__icon-user")}
                />
                <div className="modal__user"> 903 People took the exam</div>
              </div>
            </div>
            <div className={cx("modal__button")}>
              <Button primary onClick={handleClickStart}>
                Start
              </Button>
              <Button outline onClick={handleClickCancel}>
                Cancel
              </Button>
            </div>
          </div>
        }
        open={openModal}
        onCancel={handleClickCancel}
        footer={null}
      />
    </div>
  );
}

export default ExamFolder;
