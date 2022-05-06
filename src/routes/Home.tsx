import React, { useState } from "react";
import "react-reflex/styles.css";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { Repository, SearchQueryRepositoryResult, SearchRepositoryResult, SEARCH_REPOSITORY } from "../gql";
import { useApolloClient, useQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router-dom";
import { AutoComplete, Button, Form, Input, Typography } from "antd";
const { Title } = Typography;

export const Home: React.FC = () => {
  const params = useParams();
  console.log("Home params: ", params);
  return (
    <ReflexContainer orientation="vertical" style={{ minHeight: "100vh" }}>
      <ReflexElement className="left-pane" minSize={400} flex={0.3}>
        <div
          style={{
            margin: "1rem",
            padding: "1rem",
            border: "1px solid #e0e0e0",
            borderRadius: "0.25rem",
          }}
        >
          <SearchRepoForm />
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
}
export const SearchRepoForm: React.FC = () => {
  const client = useApolloClient();
  const [form] = Form.useForm();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setvalue] = useState<OptionType | OptionType[] | null>();

  console.log("--- Value: ", value);

  const onFinish = (values: any) => {
    console.log("onFinish", values);
  };
  const onChange = (value: string, option: OptionType | OptionType[]) => {
    setvalue(option);
  };
  const onSelect = (data: string, option: OptionType) => {
    console.log("onSelect", data, "   option: ", option);
  };

  const onSearch = (searchText: string) => {
    if (searchText.length > 3) {
      client.query<SearchQueryRepositoryResult>({ query: SEARCH_REPOSITORY, variables: { query: searchText } }).then((result) => {
        //
        const found = result.data.search.nodes.map((item) => {
          const value = `${item.owner.login}/${item.name}`;
          return { ...item, value };
        });

        setOptions(found);
      });
    } else {
      setOptions([]);
    }
  };

  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={onFinish} autoComplete="off">
      <Title className="Auth-title" level={4}>
        Поиск репозитория
      </Title>

      <Form.Item label="Repository" name="token" rules={[{ required: true, message: "Please input repository!" }]}>
        <AutoComplete options={options} onSelect={onSelect} onChange={onChange} onSearch={onSearch} placeholder="input here" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Нашел!
        </Button>
      </Form.Item>
    </Form>
  );
};

/*
<ReflexElement className="left-pane" minSize={300} flex={0.6}>
        <div style={{ backgroundColor: "#e0e0f0" }}>Sider</div>
      </ReflexElement>
      <ReflexElement className="right-pane" minSize={500} onResize={onMapContainerResize}>
        <div style={{ backgroundColor: "#e0f0e0" }}>Content</div>
      </ReflexElement>

  const onMapContainerResize = useCallback(() => {
    //  mapRef.current?.invalidateSize();
  }, []);
//const navigate = useNavigate();
  //const authMatch = useMatch("/auth");
  //console.log("match: ", authMatch);
  //console.log("user: ", user);


<ReflexElement className="left-pane" minSize={300} flex={0.6}>
        <RequestsTable />
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane" minSize={500} onResize={onMapContainerResize}>
        <Map doubleClickZoom={false} zoom={9} center={[55.75, 37.57]} ref={mapRef} />
      </ReflexElement>

      
 <Row style={{ minHeight: "100vh" }}>
      <Col flex="26rem" style={{ backgroundColor: "#e0f0e0" }}>
        Sider
      </Col>
      <Col flex="auto" style={{ backgroundColor: "#e0e0f0" }}>
        Content
      </Col>
    </Row>
 <div>
      <Title level={3}>Home</Title>
      <Outlet />
    </div>

*/
