import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Switch,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { privateAxios } from "../api/api";
import SharedDataContext from "../context/SharedDataContext";

const programInitialState = {
  id: undefined,
  parentId: undefined,
  name: "",
  location: "",
  allDay: false,
  start: "",
  end: "",
  tags: [],
  createdAt: undefined,
  updatedAt: undefined,
  dimension: "",
  facilitators: [],
  levelOfCare: [],
  hobbies: [],
  recurrence: {},
  isRepeated: false,
  applicantId: undefined,
  attendance: undefined,
};

type Props = {
  onSubmitSuccess: () => void;
};

const ProgramCreationForm = ({ onSubmitSuccess }: Props) => {
  const [program, setProgram] = useState(programInitialState);
  const [messageApi, contextHolder] = message.useMessage();
  const { appendProgram } = useContext(SharedDataContext);
  const onSubmit = () => {
    privateAxios
      .post("/programs", program)
      .then(({ data }) => {
        appendProgram({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : [],
          facilitators: Array.isArray(data.facilitators)
            ? data.facilitators
            : [],
          levelOfCare: Array.isArray(data.levelOfCare) ? data.levelOfCare : [],
          hobbies: Array.isArray(data.hobbies) ? data.hobbies : [],
        });
        messageApi.open({
          type: "success",
          content: "Program successfully saved!",
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
      <Form.Item label="Name*">
        <Input
          onChange={(e) => {
            setProgram({
              ...program,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Location*">
        <Input
          onChange={(e) => {
            setProgram({
              ...program,
              location: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="All Day">
        <Radio.Group
          onChange={(e) => {
            setProgram({
              ...program,
              allDay: e.target.value,
            });
          }}
        >
          <Radio value={true}> Yes </Radio>
          <Radio value={false}> No </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Start Date*">
        <DatePicker
          onChange={(date) => {
            setProgram({
              ...program,
              start: dayjs(date).format(),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="End Date*">
        <DatePicker
          onChange={(date) => {
            setProgram({
              ...program,
              end: dayjs(date).format(),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Tags">
        <Select
          mode="tags"
          onChange={(value) => {
            setProgram({
              ...program,
              tags: value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Dimension*">
        <Input
          onChange={(e) => {
            setProgram({
              ...program,
              dimension: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Facilitators">
        <Select
          mode="tags"
          onChange={(value) => {
            setProgram({
              ...program,
              facilitators: value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Level of Care">
        <Select
          mode="multiple"
          onChange={(value) => {
            setProgram({
              ...program,
              levelOfCare: value,
            });
          }}
        >
          <Select.Option value="INDEPENDENT">Independent</Select.Option>
          <Select.Option value="ASSISTED">Assisted</Select.Option>
          <Select.Option value="MEMORY">Memory</Select.Option>
          <Select.Option value="LONGTERM">Long Term</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Hobbies">
        <Select
          mode="tags"
          onChange={(value) => {
            setProgram({
              ...program,
              hobbies: value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Is Repeated?">
        <Switch
          onChange={(checked) => {
            setProgram({
              ...program,
              isRepeated: checked,
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

export default ProgramCreationForm;
