import React, { useState } from "react";
import VocabularyCard from "~/components/VocabularyCard/VocabularyCard";
import { Carousel } from "antd";

function Vocabulary() {
  const [listData, setListData] = useState([
    {
      id: 1,
      text: "情報技術",
      mean: "Công nghệ thông tin",
      image: "",
    },
    {
      id: 2,
      text: "合格",
      mean: "Đỗ",
      image: "",
    },
  ]);

  const renderCard = () => {
    return listData.map((item, index) => {
      return (
        <div key={index} className="item">
          <VocabularyCard props={item} />
        </div>
      );
    });
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <Carousel afterChange={onChange}>{renderCard()}</Carousel>
    </div>
  );
}

export default Vocabulary;
