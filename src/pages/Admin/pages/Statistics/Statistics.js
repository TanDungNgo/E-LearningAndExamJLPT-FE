import { Space } from "antd";
import { StatisticCourse } from "../../components/StatisticCourse/StatisticCourse";
import StatisticUser from "../../components/StatisticUser/StatisticUser";
import StatisticAccount from "../../components/StatisticAccount/StatisticAccount";
import StatisticRating from "../../components/StatisticRating/StatisticRating";

  function Statistics() {
    return (
      <Space size={20} direction="vertical">
        <Space direction="horizontal" style={{width: "100%"}}>
            <StatisticUser/>
            <StatisticAccount/>
        </Space>
        <Space direction="horizontal" style={{width: "100%"}}>
            <StatisticCourse/>
            <StatisticRating/>
        </Space>
      </Space>
    );
  }
  
  export default Statistics;
  