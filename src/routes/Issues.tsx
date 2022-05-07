import { useApolloClient, useQuery } from "@apollo/client";
import { Avatar, Col, List, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ReflexElement, ReflexSplitter } from "react-reflex";
import { Outlet, useParams } from "react-router-dom";
import { isIssueFieldsFragmentsArray, isUser } from "../graphql/additional";
import {
  GetIssuesDocument,
  GetIssuesQuery,
  GetIssuesQueryVariables,
  IssueFieldsFragment,
  useGetIssuesQuery,
} from "../graphql/github";
import { Box } from "../mix/Styled";

const { Title } = Typography;

export const Issues: React.FC = () => {
  const { owner, name } = useParams();
  const client = useApolloClient();
  const [issues, setIssues] = useState<IssueFieldsFragment[]>([]);

  useEffect(() => {
    if (owner !== undefined && name !== undefined) {
      client
        .query<GetIssuesQuery, GetIssuesQueryVariables>({ query: GetIssuesDocument, variables: { owner, name } })
        .then((repository) => {
          console.log(repository);
          if (isIssueFieldsFragmentsArray(repository.data.repository?.issues.nodes)) {
            setIssues(repository.data.repository!.issues.nodes);
          } else setIssues([]);
        });
    } else setIssues([]);
  }, [owner, name, client]);

  console.log(issues);

  return (
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
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
