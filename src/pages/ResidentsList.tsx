import { Button, List, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import ResidentCreationForm from "../components/ResidentCreationForm";
import SharedDataContext from "../context/SharedDataContext";

const getProgramNames = (programs: any, programsInfo: any) => {
  return programs?.map((program: any) => {
    const matchingProgramInfo = programsInfo.find(
      (info: any) => info.id === program.programId
    );
    return matchingProgramInfo ? matchingProgramInfo.name : null;
  });
};

const ResidentsList = () => {
  const { residents, programs } = useContext(SharedDataContext);
  const [showResidentCreationModal, setShowResidentCreationModal] =
    useState(false);
  const [showProgramsModal, setShowProgramsModal] = useState(false);
  const [
    selectedResidentForProgramsModal,
    setSelectedResidentForProgramsModal,
  ] = useState<null | any>(null);
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
    {
      title: "Programs",
      dataIndex: "",
      render: (_, data) => (
        <a
          onClick={() => {
            setShowProgramsModal(true);
            setSelectedResidentForProgramsModal(data);
          }}
        >
          View Programs
        </a>
      ),
    },
  ];
  console.log("residents: ", residents);
  return (
    <div style={{ width: "100%" }}>
      <Space wrap style={{ padding: "16px" }}>
        <Button
          type="primary"
          onClick={() => setShowResidentCreationModal(true)}
        >
          Add Resident
        </Button>
        <Button type="default">Enroll In Program</Button>
      </Space>
      <Table dataSource={residents} columns={tableColumns} pagination={false} />
      <Modal
        title={`${selectedResidentForProgramsModal?.name} Programs`}
        open={showProgramsModal}
        onCancel={() => {
          setShowProgramsModal(false);
          setSelectedResidentForProgramsModal(null);
        }}
        footer={null}
        destroyOnClose
      >
        <List
          bordered
          dataSource={getProgramNames(
            selectedResidentForProgramsModal?.attendance,
            programs
          )}
          renderItem={(item: string) => (
            <List.Item>
              <div>{item}</div>
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        title="Add Resident"
        open={showResidentCreationModal}
        onCancel={() => {
          setShowResidentCreationModal(false);
        }}
        footer={null}
        destroyOnClose
      >
        <ResidentCreationForm
          onSubmitSuccess={() => {
            setShowResidentCreationModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default ResidentsList;
