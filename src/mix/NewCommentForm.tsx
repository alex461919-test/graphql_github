import { Button, Form, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { IssueFieldsFragment, GetIssueDocument, useAddCommentMutation } from "../graphql/github";
import { showNotificationError } from "./modal";
import { Box } from "./Styled";

const { Title } = Typography;

const NewCommentForm: React.FC<{ issue: IssueFieldsFragment }> = ({ issue }) => {
  const [form] = Form.useForm();
  const [body, setBody] = useState("");

  const [addComment, { error, loading }] = useAddCommentMutation({
    variables: { comment: { subjectId: issue.id, body } },
    refetchQueries: [GetIssueDocument],
  });

  useEffect(() => {
    if (error) {
      showNotificationError({ message: "Get issue error!", description: error.message });
    }
  }, [error]);

  const onFinish = useCallback(() => {
    addComment().then(() => {
      form.resetFields();
      setBody("");
    });
  }, [addComment, form]);

  const onBodyChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setBody(event.target.value);
  }, []);

  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
      <Box mb="1rem">
        <Title className="Auth-title" level={4}>
          Новый коментарий
        </Title>
      </Box>

      <Form.Item label="Текст" name="body">
        <TextArea rows={4} placeholder="input here" value={body} onChange={onBodyChange} />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit" disabled={body.length === 0 || loading}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export { NewCommentForm };
