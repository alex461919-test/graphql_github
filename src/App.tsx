import React from "react";
import { useQuery } from "@apollo/client";
import "./App.scss";
import { User, WHOAMI } from "./gql";
import { AuthForm } from "./AuthForm";

function App() {
  //const client = useApolloClient(); //: ApolloClient<object> {}
  // console.dir(client.link);
  const { loading, error, data } = useQuery<User>(WHOAMI);
  console.log({ loading, error, data });
  return data ? <div className="App">OK!</div> : <AuthForm />;
}

export default App;
