import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContext } from "react";
import SharedDataContext from "../context/SharedDataContext";

const ProgramsList = () => {
  const { programs } = useContext(SharedDataContext);
  const tableColumns: ColumnsType<object> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (location) => <span>{location}</span>,
    },
    {
      title: "All Day",
      dataIndex: "allDay",
      width: "5rem",
      render: (allDay) => <span>{allDay ? "Yes" : "No"}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "start",
      width: "6.5rem",
      render: (start) => <span>{dayjs(start).format("HH:mm")}</span>,
    },
    {
      title: "End Time",
      dataIndex: "end",
      width: "6rem",
      render: (end) => <span>{dayjs(end).format("HH:mm")}</span>,
    },
    {
      title: "Date",
      dataIndex: "start",
      render: (start) => <span>{dayjs(start).format("D MMMM, YYYY")}</span>,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <div>
          {tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Dimension",
      dataIndex: "dimension",
      render: (dimension) => <span>{dimension}</span>,
    },
    {
      title: "Facilitators",
      dataIndex: "facilitators",
      render: (facilitators) => (
        <div>
          {facilitators.map((facilitator: string) => (
            <Tag key={facilitator}>{facilitator}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Level of Care",
      dataIndex: "levelOfCare",
      render: (levels) => (
        <div>
          {levels.map((level: string) => (
            <Tag key={level}>{level}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Hobbies",
      dataIndex: "hobbies",
      render: (hobbies) => (
        <div>
          {hobbies.map((hobby: string) => (
            <Tag key={hobby}>{hobby}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Recurrence",
      dataIndex: "recurrence",
      render: (recurrence) => <span>{String(recurrence) || "N/A"}</span>,
    },
    {
      title: "Repeated",
      dataIndex: "isRepeated",
      render: (isRepeated) => <span>{isRepeated ? "Yes" : "No"}</span>,
    },
  ];
  console.log("programs: ", programs);
  return (
    <div style={{ width: "100%" }}>
      <Table dataSource={programs} columns={tableColumns} pagination={false} />
    </div>
  );
};

export default ProgramsList;
