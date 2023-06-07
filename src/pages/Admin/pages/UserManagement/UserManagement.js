import { Button, Space, Select, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import usersService from "~/services/usersService";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import XLSX from 'xlsx/dist/xlsx.full.min';

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
      user.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
      (user.username.toLowerCase().includes(searchText.toLowerCase()) &&
        (filterGender ? user.gender === filterGender : true) &&
        (filterRole
          ? user.roles.find((role) => role.name === filterRole)
          : true))
    );
  });
  const handleExport = () => {
    // Get the table data
    const dataSource = filteredUsers;

    // Prepare the worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataSource);

    // Prepare the workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file
    saveAs(blob, "users_data.xlsx");
  };
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
        <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
          Export
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default UserManagement;
