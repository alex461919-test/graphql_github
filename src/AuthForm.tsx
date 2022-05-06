import React from "react";
import { useApolloClient } from "@apollo/client";
import { Form, Input, Button, Typography } from "antd";
import { personalToken } from "./api";
import { WHOAMI } from "./gql";

const { Title } = Typography;

export const AuthForm = () => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    personalToken(values.token);
    client.query({ query: WHOAMI }).catch((error) => {
      form.setFields([{ name: "token", errors: [error.message] }]);
    });
  };

  return (
    <div className="Auth-layout">
      <div className="Auth-container">
        <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
          <Title className="Auth-title" level={4}>
            Github authorization
          </Title>

          <Form.Item
            label="Your personal token"
            name="token"
            rules={[{ required: true, message: "Please input your personal token!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
