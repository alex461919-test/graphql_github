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
export interface User {
  id: number;
  login: string;
  url: string;
  projectsUrl: string;
  name: string | null;
}
