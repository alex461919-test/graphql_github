import React, { useState } from "react";
import {
  RepositoryFieldsFragment,
  SearchRepositoryDocument,
  SearchRepositoryQuery,
  SearchRepositoryQueryVariables,
} from "../graphql/github";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { AutoComplete, Button, Form, Typography } from "antd";
import { isRepositoryFieldsFragmentsArray } from "../graphql/additional";
import { Box } from "./Styled";

const { Title } = Typography;

export const SearchRepositoryForm: React.FC<{ onSelect?: (arg: RepositoryFieldsFragment) => void }> = ({ onSelect }) => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [changedValue, setChangedValue] = useState<OptionType | {}>({});

  const onFinish = () => {
    if (isOptionType(changedValue)) {
      onSelect && onSelect(changedValue);
    } else {
      form.setFields([{ name: "repository", errors: ["Invalid repository!"] }]);
    }
  };
  const onChange = (value: string, option: OptionType | OptionType[]) => {
    setChangedValue(isOptionType(option) ? option : {});
  };

  const onSearch = async (searchText: string) => {
    setOptions(searchText.length > 3 ? await getSearchRepositoryOptions(client, searchText) : []);
  };

  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
      <Box mb="1rem">
        <Title className="Auth-title" level={4}>
          Поиск
        </Title>
      </Box>

      <Form.Item label="Repository" name="repository" rules={[{ required: true, message: "Please input repository!" }]}>
        <AutoComplete options={options} onChange={onChange} onSearch={onSearch} placeholder="input here" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Выбрать
        </Button>
      </Form.Item>
    </Form>
  );
};

interface OptionType extends RepositoryFieldsFragment {
  value: string;
  label: string | JSX.Element;
}
function isOptionType(option: OptionType | OptionType[] | {}): option is OptionType {
  return !Array.isArray(option) && (option as OptionType).id !== undefined;
}

async function getSearchRepositoryOptions(client: ApolloClient<object>, searchText: string): Promise<OptionType[]> {
  return await client
    .query<SearchRepositoryQuery, SearchRepositoryQueryVariables>({
      query: SearchRepositoryDocument,
      variables: { query: searchText },
    })
    .then((result) => {
      if (isRepositoryFieldsFragmentsArray(result.data.search.nodes)) {
        return result.data.search.nodes.map((reposotory) => {
          const value = `${reposotory.owner.login}/${reposotory.name}`;
          const label = (
            <div>
              {value}
              <div style={{ opacity: 0.5, whiteSpace: "normal" }}>{reposotory.description}</div>
            </div>
          );
          return { ...reposotory, value, label };
        });
      } else {
        return [];
      }
    });
}
