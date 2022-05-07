import React, { useEffect, useState } from "react";
import "react-reflex/styles.css";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import {
  GetRepositoryDocument,
  GetRepositoryQuery,
  GetRepositoryQueryVariables,
  RepositoryFieldsFragment,
} from "../graphql/github";
import { useApolloClient } from "@apollo/client";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SearchRepositoryForm } from "./SearchRepositoryForm";
import { Col, Row } from "antd";
import { Repository } from "./Repository";

export const Home: React.FC = () => {
  const { owner, name } = useParams();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [selectedRepository, setSelectedRepository] = useState<RepositoryFieldsFragment | null>(null);

  const onSelect = (repo: RepositoryFieldsFragment) => {
    navigate(`${repo.owner.login}/${repo.name}`);
  };
  useEffect(() => {
    if (owner !== undefined && name !== undefined) {
      client
        .query<GetRepositoryQuery, GetRepositoryQueryVariables>({ query: GetRepositoryDocument, variables: { owner, name } })
        .then((repository) => {
          setSelectedRepository(repository.data.repository || null);
        });
    } else setSelectedRepository(null);
  }, [owner, name, client]);

  return (
    <ReflexContainer orientation="vertical" style={{ minHeight: "100vh" }}>
      <ReflexElement className="left-pane" minSize={400} flex={0.3}>
        <div className="Border-container">
          <SearchRepositoryForm onSelect={onSelect} />
        </div>
        {selectedRepository !== null ? (
          <div className="Border-container">
            <Repository repository={selectedRepository} />
          </div>
        ) : (
          <></>
        )}
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane" minSize={500}>
        <Outlet />
      </ReflexElement>
    </ReflexContainer>
  );
};
