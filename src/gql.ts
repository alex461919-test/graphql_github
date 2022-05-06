import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    login
    name
    avatarUrl
  }
`;

export const WHOAMI = gql`
  query GetAuthUser {
    viewer {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export interface User {
  id: number;
  login: string;
  name: string | null;
  avatarUrl: string | null;
}

export const SEARCH_REPOSITORY = gql`
  query SearchRepository($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      nodes {
        ... on Repository {
          id
          name
          description
          url
          owner {
            login
          }
        }
      }
      repositoryCount
    }
  }
`;

export const REPOSITORY = gql`
  query getRepository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      description
      createdAt
      url
      issues(first: 10) {
        nodes {
          id
          title
          createdAt
          author {
            login
          }
        }
        totalCount
      }
    }
  }
`;
export const ISSUES = gql`
  query getIssues($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      issues(first: 10) {
        nodes {
          id
          title
          createdAt
          author {
            ... on User {
              ...UserFields
            }
          }
        }
        totalCount
      }
    }
  }
  ${USER_FIELDS}
`;

export interface Actor {
  id: string;
  title: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  createdAt: string;
}

export interface RepositoryOwner {
  login: string;
}
export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  owner: RepositoryOwner;
}
export interface IssueConnection {
  nodes: [Issue];
  totalCount: number;
}
export interface SearchRepositoryResultItemConnection {
  nodes: [Repository];
  repositoryCount: number;
}
export interface SearchQueryRepositoryResult {
  search: SearchRepositoryResultItemConnection;
}

//IssueConnection.nodes: [Issue]
export interface RepositoryWithIssues {
  issues: IssueConnection;
}
