import { List, Modal, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import SharedDataContext from "../context/SharedDataContext";

const getResidentNames = (residents: any, residentsInfo: any) => {
  return residents?.map((resident: any) => {
    const matchingResidentInfo = residentsInfo.find(
      (info: any) => info.id === resident.residentId
    );
    return matchingResidentInfo ? matchingResidentInfo.name : null;
  });
};

const ProgramsList = () => {
  const { programs, residents } = useContext(SharedDataContext);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [
    selectedProgramForParticipantsModal,
    setSelectedProgramForParticipantsModal,
  ] = useState<null | any>(null);
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
      title: "Participants",
      dataIndex: "",
      render: (_, data) => (
        <a
          onClick={() => {
            setShowParticipantsModal(true);
            setSelectedProgramForParticipantsModal(data);
          }}
        >
          View Participants
        </a>
      ),
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
      <Modal
        title={`${selectedProgramForParticipantsModal?.name} Participants`}
        open={showParticipantsModal}
        onCancel={() => {
          setShowParticipantsModal(false);
          setSelectedProgramForParticipantsModal(null);
        }}
        footer={null}
        destroyOnClose
      >
        <List
          bordered
          dataSource={getResidentNames(
            selectedProgramForParticipantsModal?.attendance,
            residents
          )}
          renderItem={(item: string) => (
            <List.Item>
              <div>{item}</div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default ProgramsList;
