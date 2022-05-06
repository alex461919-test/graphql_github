import React, { PropsWithChildren, useEffect } from "react";
import { ApolloError, useApolloClient, useQuery } from "@apollo/client";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { personalToken } from "../api";
import { User, WHOAMI } from "../gql";

const { Title } = Typography;

export const Auth = () => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    personalToken(values.token);
    client
      .query({ query: WHOAMI })
      .then(() => {
        console.log(values);
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
    <div className="Auth-layout ">
      <div className="Auth-container Border-container">
        <Form
          form={form}
          layout="vertical"
          labelAlign="left"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ remember: true, token: localStorage.getItem("token") ?? "" }}
        >
          <Title className="Auth-title" level={4}>
            Github authorization
          </Title>

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
      </div>
    </div>
  );
};
/*
const AuthContext = React.createContext<{ loading: boolean; error: ApolloError | undefined; user: User | null }>(null!);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  let [user, setUser] = React.useState<User | null>(null);
  const { loading, error, data } = useQuery<{ viewer: User }>(WHOAMI);

  useEffect(() => {
    setUser(data?.viewer || null);
  }, [data?.viewer]);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};
*/
const AuthContext = React.createContext<{ pending: boolean; user: User | null }>(null!);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { error, data } = useQuery<{ viewer: User }>(WHOAMI);
  const user = data?.viewer || null;
  const pending = !error && !user;

  return <AuthContext.Provider value={{ user, pending }}>{children}</AuthContext.Provider>;
};
