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

export default App;
