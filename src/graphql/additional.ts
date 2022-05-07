import { IssueFieldsFragment, RepositoryFieldsFragment, User } from "./github";

export function isRepositoryFieldsFragment(obj: any): obj is RepositoryFieldsFragment {
  return typeof obj === "object" && (obj as RepositoryFieldsFragment).__typename === "Repository";
}

export function isRepositoryFieldsFragmentsArray(obj: any): obj is Array<RepositoryFieldsFragment> {
  return Array.isArray(obj) && isRepositoryFieldsFragment(obj[0]);
}

export function isIssueFieldsFragment(obj: any): obj is IssueFieldsFragment {
  return typeof obj === "object" && (obj as IssueFieldsFragment).__typename === "Issue";
}

export function isIssueFieldsFragmentsArray(obj: any): obj is Array<IssueFieldsFragment> {
  return Array.isArray(obj) && isIssueFieldsFragment(obj[0]);
}

export function isUser(obj: any): obj is User {
  return typeof obj === "object" && (obj as User).__typename === "User";
}
