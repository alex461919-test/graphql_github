import { Avatar, List, Typography } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { isIssueFieldsFragmentsArray, isRepositoryFieldsFragment, isUser } from "../graphql/additional";
import { IssueFieldsFragment, RepositoryFieldsFragment, useGetIssuesQuery } from "../graphql/github";
import { showNotificationError } from "../mix/modal";
import { NewIssueForm } from "../mix/NewIssueForm";

const { Title } = Typography;

export const Issues: React.FC = () => {
  const params = useParams();
  const { owner = "", name = "" } = params;
  let issues: IssueFieldsFragment[] = [];
  let repository: RepositoryFieldsFragment | null = null;

  const { data, error } = useGetIssuesQuery({ variables: { owner, name } });

  useEffect(() => {
    if (error) {
      showNotificationError({ message: "Get issues error!", description: error.message });
    }
  }, [error]);

  if (data === undefined) return <></>;

  if (isIssueFieldsFragmentsArray(data?.repository?.issues.nodes)) {
    issues = data!.repository!.issues.nodes;
  }
  if (isRepositoryFieldsFragment(data?.repository)) {
    repository = data.repository;
  }

  return (
    <List
      header={
        <Title className="Auth-title" level={4}>
          Вопросы
        </Title>
      }
      footer={
        repository ? (
          <div className="Border-container">
            <NewIssueForm {...{ repository }} />
          </div>
        ) : (
          <></>
        )
      }
      bordered
      dataSource={issues}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={isUser(item.author) ? item.author.avatarUrl : null} />}
            title={isUser(item.author) ? item.author.login : null}
            description={item.title}
          />
          <div>{item.createdAt}</div>
        </List.Item>
      )}
    />
  );
};
