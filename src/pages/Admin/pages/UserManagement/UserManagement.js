import { Button, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import userData from "~/data/userData";
import usersService from "~/services/usersService";
import { useEffect, useState } from "react";
const { Search } = Input;
const roleColors = {
  ADMIN: "green",
  STUDENT: "volcano",
  USER: "geekblue",
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  // {
  //   title: "Avatar",
  //   dataIndex: "avatar",
  //   key: "avatar",
  // },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
    render: (_, { roles }) => (
      
      <>
        {roles.map((role, index) => {
        const color = roleColors[role.name.toUpperCase()] || "geekblue";
        return (
          <Tag color={color} key={index}>
            {role.name}
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
  const {getAllUser} = usersService();
  const [userData, setUserData] = useState([]);
  

  useEffect(() => {
    getAllUser().then((res) => {
      console.log(res);
      setUserData(res);
    })
  }, [])
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
