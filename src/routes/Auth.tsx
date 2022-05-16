import React, { PropsWithChildren } from "react";
import { useApolloClient } from "@apollo/client";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { personalToken } from "../api";
import { GetCurrentViewerDocument, useGetCurrentViewerQuery, UserFieldsFragment } from "../graphql/github";
import { Box } from "../mix/Styled";

const { Title } = Typography;

export const Auth = () => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    personalToken(values.token);
    client
      .query({ query: GetCurrentViewerDocument })
      .then(() => {
        if (values.remember) {
          localStorage.setItem("token", values.token);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        form.setFields([{ name: "token", errors: [error.message] }]);
      });
  };

  return (
    <div className="Full-window-layout">
      <Box className="Border-container" minWidth="26rem">
        <Form
          form={form}
          layout="vertical"
          labelAlign="left"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ remember: true, token: localStorage.getItem("token") ?? "" }}
        >
          <Box mb="1rem" textAlign="center">
            <Title level={4}>Github authorization</Title>
          </Box>

          <Form.Item
            label="Your personal token"
            name="token"
            rules={[{ required: true, message: "Please input your personal token!" }]}
          >
            <Input placeholder="input here" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </div>
  );
};

const AuthContext = React.createContext<{ pending: boolean; user: UserFieldsFragment | null }>(null!);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { error, data } = useGetCurrentViewerQuery();
  const user = data?.viewer || null;
  const pending = !error && !user;

  return <AuthContext.Provider value={{ user, pending }}>{children}</AuthContext.Provider>;
};
