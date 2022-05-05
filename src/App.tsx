import React, { useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Form, Input, Button, Checkbox, Row, Col, Space, Typography } from "antd";
import "./App.scss";
import { personalToken } from "./api";

const { Title } = Typography;

const WHOAMI = gql`
  query GetAuthUser {
    viewer {
      id
      login
      name
      projectsUrl
      url
    }
  }
`;
interface User {
  id: number;
  login: string;
  url: string;
  projectsUrl: string;
  name: string | null;
}

function App() {
  //const client = useApolloClient(); //: ApolloClient<object> {}
  // console.dir(client.link);
  const { loading, error, data } = useQuery<User>(WHOAMI);
  console.log({ loading, error, data });
  return <div className="App">{data ? <>OK!</> : <AuthForm />}</div>;
}

export default App;

const AuthForm = () => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    personalToken(values.token);
    client.query({ query: WHOAMI }).catch((error) => {
      form.setFields([{ name: "token", errors: [error.message] }]);
    });
  };

  return (
    <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
      <Col style={{ width: "26rem" }}>
        <div style={{ padding: "1rem", margin: "1rem", border: "1px solid #e0e0e0", borderRadius: ".25rem" }}>
          <Form
            name="token-form"
            form={form}
            labelCol={{ xs: 24 }}
            labelWrap={true}
            labelAlign="left"
            wrapperCol={{ xs: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Title level={4} style={{ textAlign: "center", marginBottom: "1rem" }}>
              Github authorization
            </Title>
            <Form.Item
              label="Personal token"
              name="token"
              rules={[
                {
                  required: true,
                  message: "Please input your personal token!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
