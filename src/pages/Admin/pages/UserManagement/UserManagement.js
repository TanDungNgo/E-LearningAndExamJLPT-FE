import { Space, Table, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import classNames from "classnames/bind";
import styles from "./UserManagement.module.scss";
import Button from "~/components/Button/Button";
const { Search } = Input;
const cx = classNames.bind(styles);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <EditOutlined style={{ fontSize: "20px", color: "#0a9a41" }} />
        </a>
        <a>
          <DeleteOutlined
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
function UserManagement() {
  const onSearch = (value) => console.log(value);
  return (
    <div className={cx("container")}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        /> */}
        <Button
          primary
          className={cx("btn-insert")}
          leftIcon={<PlusOutlined />}
        >
          Insert
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default UserManagement;
