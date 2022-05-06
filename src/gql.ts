import { gql } from "@apollo/client";

export const WHOAMI = gql`
  query GetAuthUser {
    viewer {
      id
      login
      name
      projectsUrl
      url
    }
  }
`;

export const SEARCH_REPOSITORY = gql`
  query SearchRepository($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          owner {
            login
          }
        }
      }
      repositoryCount
    }
  }
`;

export interface RepositoryOwner {
  login: string;
}
export interface Repository {
  id: string;
  name: string;
  owner: RepositoryOwner;
}
export interface SearchRepositoryResult {
  nodes: [Repository];
  repositoryCount: number;
}
export interface SearchQueryRepositoryResult {
  search: SearchRepositoryResult;
}

export interface User {
  id: number;
  login: string;
  url: string;
  projectsUrl: string;
  name: string | null;
}
