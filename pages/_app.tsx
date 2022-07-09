import React from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "../components/GlobalStyle";
import Header from "../components/Header";

const queryClient = new QueryClient();

const Container = styled.div`
  display: flex;
  margin: 3em 2em;
  width: 100%;
  max-width: 1800px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 640px) {
    margin: 4em 2em;
  }

  @media only screen and (min-width: 880px) {
    margin: 6em 3em;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
