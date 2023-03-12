import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { privateAxios } from "../api/api";
import SharedDataContext from "../context/SharedDataContext";

const residentInitialState = {
  id: undefined,
  name: "",
  firstName: "",
  lastName: "",
  preferredName: "",
  status: "",
  room: "",
  levelOfCare: "",
  ambulation: "",
  birthDate: dayjs().format(),
  moveInDate: dayjs().format(),
  applicantId: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  attendance: undefined,
};

type Props = {
  onSubmitSuccess: () => void;
};

const ResidentCreationForm = ({ onSubmitSuccess }: Props) => {
  const [resident, setResident] = useState(residentInitialState);
  const [messageApi, contextHolder] = message.useMessage();
  const { appendResident } = useContext(SharedDataContext);
  const onSubmit = () => {
    privateAxios
      .post("/residents", {
        ...resident,
        name: `${resident.firstName} ${resident.lastName}`,
      })
      .then(({ data }) => {
        appendResident({
          ...data,
        });
        messageApi.open({
          type: "success",
          content: "Resident successfully saved!",
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
      <Form.Item label="First Name*">
        <Input
          onChange={(e) => {
            setResident({
              ...resident,
              firstName: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Last Name*">
        <Input
          onChange={(e) => {
            setResident({
              ...resident,
              lastName: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Preferred Name">
        <Input
          onChange={(e) => {
            setResident({
              ...resident,
              preferredName: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Select
          onChange={(value) => {
            setResident({
              ...resident,
              status: value,
            });
          }}
        >
          <Select.Option value="HERE">Here</Select.Option>
          <Select.Option value="HOSPITAL">Hospital</Select.Option>
          <Select.Option value="LOA">LOA</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Room Number*">
        <InputNumber
          onChange={(value) => {
            setResident({
              ...resident,
              room: String(value),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Level of Care*">
        <Select
          onChange={(value) => {
            setResident({
              ...resident,
              levelOfCare: value,
            });
          }}
        >
          <Select.Option value="INDEPENDENT">Independent</Select.Option>
          <Select.Option value="MEMORY">Memory</Select.Option>
          <Select.Option value="ASSISTED">Assisted</Select.Option>
          <Select.Option value="LONGTERM">Long Term</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ambulation*">
        <Select
          onChange={(value) => {
            setResident({
              ...resident,
              ambulation: value,
            });
          }}
        >
          <Select.Option value="CANE">Cane</Select.Option>
          <Select.Option value="NOLIMITATIONS">No Limitations</Select.Option>
          <Select.Option value="WALKER">Walker</Select.Option>
          <Select.Option value="WHEELCHAIR">Wheel Chair</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Birthday">
        <DatePicker
          onChange={(date) => {
            setResident({
              ...resident,
              birthDate: dayjs(date).format(),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Move In Date">
        <DatePicker
          onChange={(date) => {
            setResident({
              ...resident,
              moveInDate: dayjs(date).format(),
            });
          }}
        />
      </Form.Item>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ResidentCreationForm;
