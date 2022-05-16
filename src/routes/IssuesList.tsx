import { Avatar, List, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isIssueFieldsFragmentsArray, isRepositoryFieldsFragment, isUser } from "../graphql/additional";
import { IssueFieldsFragment, RepositoryFieldsFragment, useGetIssuesListQuery } from "../graphql/github";
import { showNotificationError } from "../mix/modal";
import { NewIssueForm } from "../mix/NewIssueForm";
import { Box } from "../mix/Styled";

const { Title } = Typography;

export const IssuesList: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { owner, name } = params;

  if (owner === undefined || name === undefined) {
    throw new Error("Invalid path!");
  }

  const { data, error } = useGetIssuesListQuery({ variables: { owner, name } });

  useEffect(() => {
    if (error) {
      showNotificationError({ message: "Get issues error!", description: error.message });
    }
  }, [error]);

  const issues = useMemo<IssueFieldsFragment[]>(() => {
    if (isIssueFieldsFragmentsArray(data?.repository?.issues.nodes)) {
      return data!.repository!.issues.nodes;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.repository?.issues.nodes]);

  const repository = useMemo<RepositoryFieldsFragment | null>(() => {
    if (isRepositoryFieldsFragment(data?.repository)) {
      return data!.repository;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.repository]);

  if (data === undefined || repository === null) return <></>;

  return (
    <Box m="1rem">
      <List
        header={
          <Title className="Auth-title" level={4}>
            Вопросы
          </Title>
        }
        footer={
          <Box mt="2rem">
            <NewIssueForm {...{ repository }} />
          </Box>
        }
        bordered
        dataSource={issues}
        renderItem={(item) => (
          <List.Item key={item.id} className="Issue-item" onClick={() => navigate(`${item.number}`)}>
            <List.Item.Meta
              avatar={<Avatar src={isUser(item.author) ? item.author.avatarUrl : null} />}
              title={isUser(item.author) ? item.author.login : null}
              description={item.title}
            />
            <div>{item.createdAt}</div>
          </List.Item>
        )}
      />
    </Box>
  );
};
