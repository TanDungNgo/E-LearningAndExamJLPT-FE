import { Button, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import userData from "~/data/userData";
const { Search } = Input;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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
          let color = "geekblue";
          if (tag === "student") {
            color = "volcano";
          }
          if (tag === "admin") {
            color = "green";
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
          <EditOutlined
            style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
          />
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
function UserManagement() {
  const onSearch = (value) => console.log(value);
  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
        >
          Insert
        </Button>
      </div>
      <Table columns={columns} dataSource={userData} />
    </div>
  );
}
export default UserManagement;
