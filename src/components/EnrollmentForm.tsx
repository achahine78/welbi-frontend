import { Button, Form, message, Select } from "antd";
import { useContext, useState } from "react";
import { privateAxios } from "../api/api";
import SharedDataContext from "../context/SharedDataContext";

type Props = {
  onSubmitSuccess: () => void;
};

const EnrollmentForm = ({ onSubmitSuccess }: Props) => {
  const { programs, residents, updateAttendance } =
    useContext(SharedDataContext);
  const [selectedProgram, setSelectedProgram] = useState();
  const [selectedResident, setSelectedResident] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = () => {
    console.log("selectedProgram: ", selectedProgram);
    console.log("selectedResident: ", selectedResident);
    privateAxios
      .post(`programs/${selectedProgram}/attend`, {
        residentId: selectedResident,
        status: selectedStatus,
      })
      .then(() => {
        updateAttendance(selectedProgram, selectedResident, selectedStatus);
        messageApi.open({
          type: "success",
          content: "Resident successfully enrolled!",
        });
        setTimeout(() => {
          onSubmitSuccess();
        }, 500);
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          messageApi.open({
            type: "error",
            content: error?.response?.data?.errors,
          });
        } else {
          messageApi.open({
            type: "error",
            content: "Something went wrong",
          });
        }
      });
  };
  return (
    <Form>
      {contextHolder}
      <Form.Item label="Program">
        <Select onChange={(value) => setSelectedProgram(value)}>
          {programs?.map((program) => (
            <Select.Option value={program.id}>{program.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Resident">
        <Select onChange={(value) => setSelectedResident(value)}>
          {residents?.map((resident) => (
            <Select.Option value={resident.id}>{resident.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Status">
        <Select onChange={(value) => setSelectedStatus(value)}>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Passive">Passive</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" onClick={onSubmit}>
        Enroll
      </Button>
    </Form>
  );
};

export default EnrollmentForm;
