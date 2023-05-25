import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import routes from "~/configs/routes";

function NotFound() {
  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Sorry, the page you are looking for does not exist."
      icon={<HomeOutlined />}
      extra={
        <Link to={routes.home}>
          <Button type="primary" icon={<HomeOutlined />}>
            Back Home
          </Button>
        </Link>
      }
    />
  );
}

export default NotFound;
