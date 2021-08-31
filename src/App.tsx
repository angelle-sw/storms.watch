import styled from "styled-components";
import { Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Streams from "./pages/Streams";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import LoadingIndicator from "./LoadingIndicator";

const Container = styled.div<{ $isOpen: boolean }>`
  display: flex;
  margin: 3em 2em;
  width: 100%;
  max-width: ${({ $isOpen }) => ($isOpen ? "100%" : "1200px")};
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

function App() {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(
    window.innerWidth >= 880
  );
  const [activeSocialFeed, setActiveSocialFeed] = useState<
    "reddit" | "twitter"
  >("reddit");

  return (
    <BrowserRouter>
      <Container $isOpen={socialFeedIsOpen}>
        <GlobalStyle />
        <Header />

        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            <PrivateRoute path="/admin" element={<Dashboard />} />
            <Route
              path="/"
              element={
                <Streams
                  activeSocialFeed={activeSocialFeed}
                  setActiveSocialFeed={setActiveSocialFeed}
                  setSocialFeedIsOpen={setSocialFeedIsOpen}
                  socialFeedIsOpen={socialFeedIsOpen}
                />
              }
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
}

export default App;
