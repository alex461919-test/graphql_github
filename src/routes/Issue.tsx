import { Avatar, Button, List, Typography } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommentFieldsFragment, IssueFieldsFragment, useGetIssueQuery } from "../graphql/github";
import { showNotificationError } from "../mix/modal";
import { isIssueFieldsFragment, isCommentFieldsFragmentsArray, isUser } from "../graphql/additional";
import { Box } from "../mix/Styled";
import { NewCommentForm } from "../mix/NewCommentForm";

const { Title } = Typography;

const Issue: React.FC = () => {
  const { owner, name, issueNumber } = useParams();
  const navigate = useNavigate();

  const number = Number.parseInt(issueNumber || "");
  if (owner === undefined || name === undefined || Number.isNaN(number)) {
    throw new Error("Invalid path!");
  }
  const { data, error } = useGetIssueQuery({ variables: { owner, name, number } });

  useEffect(() => {
    if (error) {
      showNotificationError({ message: "Get issue error!", description: error.message });
    }
  }, [error]);

  const issue = useMemo<IssueFieldsFragment | null>(() => {
    if (isIssueFieldsFragment(data?.repository?.issue)) {
      return data!.repository!.issue;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.repository?.issue]);

  const comments = useMemo<CommentFieldsFragment[]>(() => {
    if (isCommentFieldsFragmentsArray(data?.repository?.issue?.comments.nodes)) {
      return data!.repository!.issue!.comments.nodes;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.repository?.issue?.comments.nodes]);

  if (data === undefined || issue === null) return <></>;

  return (
    <Box m="1rem">
      <Box mb=".5rem">
        <Button type="link" onClick={() => navigate(`/${owner}/${name}`)}>
          Перейти к списку вопросов
        </Button>
      </Box>
      <List
        header={
          <Title className="Auth-title" level={4}>
            {issue.title}
          </Title>
        }
        footer={
          <div className="Border-container">
            <NewCommentForm issue={issue} />
          </div>
        }
        bordered
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={isUser(item.author) ? item.author.avatarUrl : null} />}
              title={isUser(item.author) ? item.author.login : null}
              description={item.body}
            />
            <div>{item.createdAt}</div>
          </List.Item>
        )}
      />
    </Box>
  );
};

export { Issue };
