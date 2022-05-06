import { useQuery } from "@apollo/client";
import { Typography } from "antd";
import React, { useState } from "react";
import { ReflexElement, ReflexSplitter } from "react-reflex";
import { Outlet, useParams } from "react-router-dom";
import { SearchRepositoryResultItemConnection, SEARCH_REPOSITORY } from "../gql";

const { Title } = Typography;

export const Repository: React.FC = () => {
  const { repo } = useParams();
  const [repoQuery, setRepoQuery] = useState("");
  const { loading, error, data } = useQuery<SearchRepositoryResultItemConnection, { query: string }>(SEARCH_REPOSITORY, {
    variables: { query: "react" },
  });
  console.log(data);

  return (
    <>
      <ReflexElement className="left-pane" minSize={400} flex={0.3}>
        <div style={{ backgroundColor: "#e0e0f0" }}>Repositories</div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane" minSize={500}>
        <Outlet />
      </ReflexElement>
    </>
  );
};
/*
 <div>
      <Title level={4}>Repo № {repo}</Title>
      <Outlet />
    </div>
*/
