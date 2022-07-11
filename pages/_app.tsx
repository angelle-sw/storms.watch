import React, { createContext, useState } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "../components/GlobalStyle";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

type IDebugContext = {
  debugFlags: {
    stormModeStatus?: boolean;
  };
  setDebugFlags: (flags: { [key: string]: any }) => void;
};

const queryClient = new QueryClient();

export const DebugContext = createContext<IDebugContext>({
  debugFlags: {},
  setDebugFlags: () => {},
});

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

const App = ({ Component, pageProps }: AppProps) => {
  const [debugFlags, setDebugFlags] = useState({});

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DebugContext.Provider value={{ debugFlags, setDebugFlags }}>
          <GlobalStyle />
          <Container>
            <NavBar adminPassphrase={pageProps.adminPassphrase} />
            <Header />
            <Component {...pageProps} />
          </Container>
        </DebugContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
