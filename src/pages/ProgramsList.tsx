import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext } from "react";
import SharedDataContext from "../context/SharedDataContext";

const tableColumns: ColumnsType<object> = [
  {
    title: "Name",
    dataIndex: "name",
    key: 0,
    render: (name) => <span>{name}</span>,
  },
];

const ProgramsList = () => {
  const { programs } = useContext(SharedDataContext);
  console.log("programs: ", programs);
  return (
    <div style={{ width: "100%" }}>
      <Table dataSource={programs} columns={tableColumns} />
    </div>
  );
};

export default ProgramsList;
