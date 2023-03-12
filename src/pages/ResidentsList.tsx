import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext } from "react";
import SharedDataContext from "../context/SharedDataContext";

const tableColumns: ColumnsType<object> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => <span>{name}</span>,
  },
];

const ResidentsList = () => {
  const { residents } = useContext(SharedDataContext);
  console.log("residents: ", residents);
  return (
    <div style={{ width: "100%" }}>
      <Table dataSource={residents} columns={tableColumns} />
    </div>
  );
};

export default ResidentsList;
