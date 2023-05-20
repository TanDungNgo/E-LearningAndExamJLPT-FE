import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

function NotFound() {
  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Sorry, the page you are looking for does not exist."
      icon={<HomeOutlined />}
      extra={
        <Button type="primary" icon={<HomeOutlined/>}>
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
