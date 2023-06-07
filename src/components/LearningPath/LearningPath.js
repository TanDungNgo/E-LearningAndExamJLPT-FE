import classNames from "classnames/bind";
import styles from "./LearningPath.module.scss";
import React from "react";
import { Timeline } from "antd";
import { SmileOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

function LearningPath() {
  return (
    <div className={cx("card")}>
        <div className={cx("card-left")}>
            <img 
                className={cx("card-left__img")}
                src="./images/LearningPath.jpg"
            />
        </div>
        <div className={cx("card-right")}>
            <div className={cx("card-right__title")}>
                How to learn?
            </div>
            <div className={cx("card-right__content")}>
                <Timeline
                    items={[
                    {
                        color: '#F7BA00',
                        dot: <SmileOutlined style={{ fontSize: '30px' }}/>,
                        children: (
                        <>
                            <p style={{fontSize: '17px', fontWeight: '600'}}>
                                Self-study vocabulary, kanji, and grammar effectively
                            </p>
                            <p style={{color: '#7A7A7A', marginTop: '10px'}}>
                                Complete daily vocabulary, kanji, and grammar lessons 
                                through learning pages on the DPT E-learning website.
                            </p>
                        </>
                        ),
                    },
                    {
                        color: '#F7BA00',
                        dot: <SmileOutlined style={{ fontSize: '30px' }}/>,
                        children: (
                        <>
                            <p style={{fontSize: '17px', fontWeight: '600'}}>
                                Join the courses of the instructors
                            </p>
                            <p style={{color: '#7A7A7A', marginTop: '10px'}}>
                                Courses with many useful video lessons will help you study according to a specific route. 
                                Learning Japanese will become easier.
                            </p>
                        </>
                        ),
                    },
                    {
                        color: '#F7BA00',
                        dot: <SmileOutlined style={{ fontSize: '30px' }}/>,
                        children: (
                        <>
                            <p style={{fontSize: '17px', fontWeight: '600'}}>
                                Take practice tests that follow the JLPT exam
                            </p>
                            <p style={{color: '#7A7A7A', marginTop: '10px'}}>
                                Students are familiar with many types of questions in the JLPT exam.
                            </p>
                        </>
                        ),
                    },
                    {
                        color: '#F7BA00',
                        dot: <SmileOutlined style={{ fontSize: '30px' }}/>,
                        children: (
                        <>
                            <p style={{fontSize: '17px', fontWeight: '600'}}>
                                Get a certificate after completing each course
                            </p>
                            <p style={{color: '#7A7A7A', marginTop: '10px'}}>
                                Complete all the lessons and exams in the course and get a certificate.
                            </p>
                        </>
                        ),
                    },
                    ]}
                />
            </div>
        </div>
    </div>
  );
}

export default LearningPath