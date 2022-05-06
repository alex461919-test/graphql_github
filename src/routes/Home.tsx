import React, { useEffect, useState } from "react";
import "react-reflex/styles.css";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import {
  REPOSITORY,
  Repository,
  SearchQueryRepositoryResult,
  SearchRepositoryResultItemConnection,
  SEARCH_REPOSITORY,
} from "../gql";
import { useApolloClient, useQuery } from "@apollo/client";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AutoComplete, Button, Form, Input, Typography } from "antd";
const { Title } = Typography;

export const Home: React.FC = () => {
  const { owner, name } = useParams();
  const navigate = useNavigate();
  const client = useApolloClient();
  console.log("Home params: ", { owner, name });

  const onFound = (repo: Repository) => {
    console.log("found repo: ", repo);
    navigate(`${repo.owner.login}/${repo.name}`);
  };
  useEffect(() => {
    if (owner !== undefined && name !== undefined) {
      client.query({ query: REPOSITORY, variables: { owner, name } }).then((repo) => {
        console.log(repo);
      });
    }
  }, [owner, name, client]);

  return (
    <ReflexContainer orientation="vertical" style={{ minHeight: "100vh" }}>
      <ReflexElement className="left-pane" minSize={400} flex={0.25}>
        <div className="Border-container">
          <SearchRepoForm onFound={onFound} />
        </div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane" minSize={500}>
        <Outlet />
      </ReflexElement>
    </ReflexContainer>
  );
};

interface OptionType extends Repository {
  value: string;
  label: string | JSX.Element;
}
function isOptionType(option: OptionType | OptionType[] | {} | null | undefined): option is OptionType {
  return typeof option === "object" && (option as OptionType).id !== undefined;
}

export const SearchRepoForm: React.FC<{ onFound?: (arg: Repository) => void }> = ({ onFound }) => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [changedValue, setChangedValue] = useState<OptionType | {}>({});

  const onFinish = () => {
    if (isOptionType(changedValue)) {
      onFound && onFound(changedValue as Repository);
    } else {
      form.setFields([{ name: "repository", errors: ["Invalid repository!"] }]);
    }
  };
  const onChange = (value: string, option: OptionType | OptionType[]) => {
    setChangedValue((isOptionType(option) && option) || {});
  };

  const onSearch = async (searchText: string) => {
    let found: OptionType[] = [];
    if (searchText.length > 3) {
      found = await client
        .query<SearchQueryRepositoryResult>({ query: SEARCH_REPOSITORY, variables: { query: searchText } })
        .then((result) =>
          result.data.search.nodes.map((item) => {
            const value = `${item.owner.login}/${item.name}`;
            const label = (
              <div>
                {value}
                <div style={{ opacity: 0.5, whiteSpace: "normal" }}>{item.description}</div>
              </div>
            );
            return { ...item, value, label };
          })
        );
    }
    setOptions(found);
  };

  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
      <Title className="Auth-title" level={4}>
        Поиск репозитория
      </Title>

      <Form.Item label="Repository" name="repository" rules={[{ required: true, message: "Please input repository!" }]}>
        <AutoComplete options={options} onChange={onChange} onSearch={onSearch} placeholder="input here" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Нашел!
        </Button>
      </Form.Item>
    </Form>
  );
};
