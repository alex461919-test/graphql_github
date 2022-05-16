import React from "react";
import "./App.scss";
import { Auth, useAuth } from "./routes/Auth";
import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { IssuesList } from "./routes/IssuesList";
import { Error404 } from "./mix/Error";
import { Issue } from "./routes/Issue";

function App() {
  const { user, pending } = useAuth();
  if (!user && !pending) return <Auth />;
  if (user)
    return (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":owner/:name" element={<IssuesList />}></Route>
          <Route path=":owner/:name/:issueNumber" element={<Issue />}></Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    );
  return <></>;
}

/*
  <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />}>
        <Route path="repository/:repoId" element={<Repository />} />
      </Route>
    </Routes>
  );
//const client = useApolloClient(); //: ApolloClient<object> {}
  // console.dir(client.link);
  //const { loading, error, data } = useQuery<{ viewer: User }>(WHOAMI);
  console.log("match: ", authMatch);
  console.log("user: ", user);
 const navigate = useNavigate();
  const authMatch = useMatch("/auth");
  //console.log("match: ", authMatch);
  //console.log("user: ", user);
 useEffect(() => {
    if (!user && !authMatch && error) navigate("/auth");
    if (user && authMatch) navigate("/");
  }, [authMatch, error, navigate, user]);

 <Route path="users" element={<Users />}>
        <Route path="me" element={<OwnUserProfile />} />
        <Route path=":id" element={<UserProfile />} />
      </Route>
*/

export default App;
