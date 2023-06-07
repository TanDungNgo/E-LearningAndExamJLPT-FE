import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import Slider from "~/components/Slider/Slider";
import ListCourse from "~/components/ListCourse/ListCourse";
import ListArticle from "~/components/ListArticle/ListArticle";
import ListTeacher from "~/components/ListTeacher/ListTeacher";
import LearningPath from "~/components/LearningPath/LearningPath";
import Chatbot from "~/components/Chatbot/Chatbot";
import PopularCourse from "~/components/PopularCourse/PopularCourse";
import NewCourse from "~/components/NewCourse/NewCourse";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <Slider/>
      <PopularCourse />
      <ListArticle />
      <LearningPath />
      <NewCourse />
      <ListTeacher />
      <Chatbot />
    </div>
  );
};


export default Home;
