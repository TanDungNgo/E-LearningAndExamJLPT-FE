import TeacherCard from "../TeacherCard/TeacherCard";
import classNames from "classnames/bind";
import styles from "./ListTeacher.module.scss";
import { useEffect, useState } from "react";
import usersService from "~/services/usersService";
import { Space, Spin } from "antd";

const cx = classNames.bind(styles);
function ListTeacher() {
  // const [listTeacher, setListTeacher] = useState(["1", "2", "3"]);
  // const renderCard = () => {
  //   return listTeacher.map((item, index) => {
  //     return (
  //       <div key={index} className="item">
  //         <TeacherCard />
  //       </div>
  //     );
  //   });
  // };

  const {getUserByTeacher} = usersService();
  const [listTeacher, setListTeacher] = useState();

  useEffect(() => {
    const getListTearcher = async () =>{
      const res = await getUserByTeacher();
      setListTeacher(res);
      console.log(res);

    };
    getListTearcher();
  }, []);

  const renderCard = () => {
    return listTeacher.map((item, index) => {
      return (
        <div key={index} className="item">
          <TeacherCard users = {item} />
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>
          Popular <span className={cx("title--primary")}>Teacher</span>
        </h1>
      </div>
      <div className={cx("list-card")}>
        {listTeacher ? (
          renderCard()
        ) : (
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        )}
      </div>
    </div>
  );
}

export default ListTeacher;
