import { Button, Card, Form, Input } from "antd";
import { privateAxios, addBearerToken } from "../api/api";

const LoginPage: React.FC = () => {
  const onFinish = ({ email }: { email: string }) => {
    privateAxios
      .post("/start", {
        email,
      })
      .then(({ data }) => {
        if (data?.token) {
          localStorage.setItem("token", data?.token);
          addBearerToken(data?.token);
          window.location.href = window.location.href;
        }
      });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" bordered={false} style={{ width: 300 }}>
        <Form name="loginForm" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
