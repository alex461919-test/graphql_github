import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { link } from "./fetchApi";
import { AuthProvider } from "./routes/Auth";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { styledTheme } from "./mix/Styled";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ApolloProvider client={client}>
    <StyledThemeProvider theme={styledTheme}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </StyledThemeProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
