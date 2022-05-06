import { useQuery } from "@apollo/client";
import { Typography } from "antd";
import React, { useState } from "react";
import { ReflexElement, ReflexSplitter } from "react-reflex";
import { Outlet, useParams } from "react-router-dom";
import { SearchRepositoryResultItemConnection, SEARCH_REPOSITORY } from "../gql";

const { Title } = Typography;

export const Issues: React.FC = () => {
  const params = useParams();
  console.log("Issues params: ", params);

  /*
  const [repoQuery, setRepoQuery] = useState("");
  const { loading, error, data } = useQuery<SearchRepositoryResult, { query: string }>(SEARCH_REPOSITORY, {
    variables: { query: "react" },
  });
  console.log(data);
*/
  return <div style={{ backgroundColor: "#e0f0e0" }}>Issues of </div>;
};
