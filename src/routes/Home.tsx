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
import { SearchRepositoryForm } from "../mix/SearchRepositoryForm";
import { Repository } from "../mix/Repository";
import { isRepositoryFieldsFragment } from "../graphql/additional";
import { showNotificationError } from "../mix/modal";

const Home: React.FC = () => {
  const client = useApolloClient();
  const { owner, name } = useParams();
  const navigate = useNavigate();

  const [selectedRepository, setSelectedRepository] = useState<RepositoryFieldsFragment | null>(null);

  useEffect(() => {
    (async function () {
      let repository: RepositoryFieldsFragment | null = null;
      if (owner !== undefined && name !== undefined) {
        await client
          .query<GetRepositoryQuery, GetRepositoryQueryVariables>({ query: GetRepositoryDocument, variables: { owner, name } })
          .then((value) => {
            if (isRepositoryFieldsFragment(value.data?.repository)) {
              repository = value.data.repository;
            }
          })
          .catch((error) => showNotificationError({ message: "Get repository error!", description: error.message }));
      }
      setSelectedRepository(repository);
    })();
  }, [client, name, owner]);

  const onSelect = (repo: RepositoryFieldsFragment) => {
    navigate(`/${repo.owner.login}/${repo.name}`);
  };

  return (
    <ReflexContainer orientation="vertical">
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

export { Home };
