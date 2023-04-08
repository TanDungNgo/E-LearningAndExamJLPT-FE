import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import Slider from "~/components/Slider/Slider";
import ListCourse from "~/components/ListCourse/ListCourse";
import ListArticle from "~/components/ListArticle/ListArticle";
import ListTeacher from "~/components/ListTeacher/ListTeacher";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <Slider/>
      <ListCourse />
      <ListArticle />
      <ListTeacher />
    </div>
  );
};

export default Home;
