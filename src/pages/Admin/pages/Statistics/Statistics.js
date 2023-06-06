import { Space } from "antd";
import { StatisticCourse } from "../../components/StatisticCourse/StatisticCourse";
import StatisticUser from "../../components/StatisticUser/StatisticUser";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import StatisticAccount from "../../components/StatisticAccount/StatisticAccount";
import StatisticRating from "../../components/StatisticRating/StatisticRating";

  function Statistics() {
    return (
      <Space size={20} direction="vertical">
        <Space direction="horizontal" style={{width:"600px"}}>
            <StatisticUser/>
            <StatisticAccount/>
        </Space>
        <Space direction="horizontal" style={{width:"600px"}}>
            <StatisticCourse/>
            <StatisticRating/>
        </Space>
      </Space>
    );
  }
  
  export default Statistics;
  