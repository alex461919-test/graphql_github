import { Table } from "antd";
import { RepositoryFieldsFragment } from "../graphql/github";

export const Repository: React.FC<{ repository: RepositoryFieldsFragment }> = ({
  repository: {
    name,
    url,
    owner: { login },
  },
}) => {
  const dataSource = [
    {
      key: "1",
      label: "Владелец:",
      value: login,
    },
    {
      key: "2",
      label: "Название:",
      value: name,
    },
    {
      key: "3",
      label: "Url:",
      value: <a href={url}>{url}</a>,
    },
  ];
  const columns = [
    {
      dataIndex: "label",
      key: "label",
    },
    {
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <Table id="repository-table" showHeader={false} pagination={false} size="small" dataSource={dataSource} columns={columns} />
  );
};
