import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContext } from "react";
import SharedDataContext from "../context/SharedDataContext";

const ResidentsList = () => {
  const { residents } = useContext(SharedDataContext);
  const tableColumns: ColumnsType<object> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Preferred Name",
      dataIndex: "preferredName",
      render: (preferredName) => <span>{preferredName}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "Room",
      dataIndex: "room",
      render: (room) => <span>{room}</span>,
    },
    {
      title: "Level Of Care",
      dataIndex: "levelOfCare",
      render: (levelOfCare) => <span>{levelOfCare}</span>,
    },
    {
      title: "Birthday",
      dataIndex: "birthDate",
      render: (birthDate) => (
        <span>{dayjs(birthDate).format("D MMMM, YYYY")}</span>
      ),
    },
    {
      title: "Move In Date",
      dataIndex: "moveInDate",
      render: (moveInDate) => (
        <span>{dayjs(moveInDate).format("D MMMM, YYYY")}</span>
      ),
    },
  ];
  console.log("residents: ", residents);
  return (
    <div style={{ width: "100%" }}>
      <Table dataSource={residents} columns={tableColumns} pagination={false} />
    </div>
  );
};

export default ResidentsList;
