import { Button, Space, Select, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import usersService from "~/services/usersService";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
  const [searchText, setSearchText] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [userData, setUserData] = useState([]);
  const { getAllUser } = usersService();

  useEffect(() => {
    getAllUser().then((res) => {
      console.log(res);
      setUserData(res);
    });
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterGenderChange = (value) => {
    setFilterGender(value);
  };
  const handleFilterRoleChange = (value) => {
    setFilterRole(value);
  };
  const handleResetFilters = () => {
    setSearchText("");
    setFilterGender("");
    setFilterRole("");
  };

  const filteredUsers = userData.filter((user) => {
    return (
      user.firstname.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterGender ? user.gender === filterGender : true) &&
      (filterRole ? user.roles.find((role) => role.name === filterRole) : true)
    );
  });


  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by User name"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          placeholder="Filter by gender"
          value={filterGender}
          onChange={handleFilterGenderChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>
        <Select
          placeholder="Filter by role"
          value={filterRole}
          onChange={handleFilterRoleChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="STUDENT">STUDENT</Select.Option>
          <Select.Option value="TEACHER">TEACHER</Select.Option>
        </Select>

        <Button
          type="primary"
          icon={
            <FontAwesomeIcon
              icon={faFilterCircleXmark}
              style={{ marginRight: "5px" }}
            />
          }
          onClick={handleResetFilters}
          style={{ marginRight: 16 }}
        >
          Reset Filters
        </Button>
        {/* <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
        >
          Insert
        </Button> */}
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

export default UserManagement;
