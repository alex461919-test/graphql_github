import { Table, Typography } from "antd";
import { RepositoryFieldsFragment } from "../graphql/github";
import { Box } from "./Styled";

const { Title } = Typography;

const Repository: React.FC<{ repository: RepositoryFieldsFragment }> = ({
  repository: {
    id,
    name,
    url,
    owner: { login },
    issues: { totalCount },
  },
}) => {
  const dataSource = [
    {
      key: "1",
      label: "id:",
      value: id,
    },
    {
      key: "2",
      label: "Владелец:",
      value: login,
    },
    {
      key: "3",
      label: "Название:",
      value: name,
    },
    {
      key: "4",
      label: "Url:",
      value: <a href={url}>{url}</a>,
    },
    {
      key: "5",
      label: "Открытых вопросов:",
      value: totalCount,
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
    <>
      <Box mb="1rem">
        <Title className="Au1th-title" level={4}>
          Репозиторий
        </Title>
      </Box>
      <Table id="repository-table" showHeader={false} pagination={false} size="small" dataSource={dataSource} columns={columns} />
    </>
  );
};

export { Repository };
