import { useApolloClient } from "@apollo/client";
import { Button, Form, Input, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ChangeEventHandler, useState } from "react";
import {
  CreateIssueDocument,
  CreateIssueMutation,
  CreateIssueMutationVariables,
  GetIssuesListDocument,
  RepositoryFieldsFragment,
} from "../graphql/github";
import { showNotificationError } from "./modal";
import { Box } from "./Styled";

const { Title } = Typography;

export const NewIssueForm: React.FC<{ repository: RepositoryFieldsFragment }> = ({ repository }) => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onFinish = () => {
    client
      .mutate<CreateIssueMutation, CreateIssueMutationVariables>({
        mutation: CreateIssueDocument,
        variables: { issue: { repositoryId: repository.id, title, body } },
        refetchQueries: [GetIssuesListDocument],
      })
      .then(() => {
        form.resetFields();
        setTitle("");
        setBody("");
      })
      .catch((error) => showNotificationError({ message: "New issue error!", description: error.message }));
  };

  const onBodyChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setBody(event.target.value);
  };
  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
      <Box mb="1rem" minWidth="26rem">
        <Title className="Auth-title" level={4}>
          Новый вопрос
        </Title>
      </Box>
      <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: "Please input text!" }]}>
        <Input placeholder="input here" onChange={onTitleChange} />
      </Form.Item>

      <Form.Item label="Текст" name="body">
        <TextArea rows={4} placeholder="input here" onChange={onBodyChange} />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit" disabled={title.length === 0}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};
